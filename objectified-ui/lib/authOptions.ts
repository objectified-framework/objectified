import GithubProvider from 'next-auth/providers/github';
import GitlabProvider from 'next-auth/providers/gitlab';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import {
  ClientAuthLogin,
  ClientUserGetUser,
  ClientTenantListTenantsByUserId,
  ClientTenantGetTenantById,
} from '@objectified-framework/objectified-services/dist/generated/clients';
import jwt from 'jsonwebtoken';
import {JWT} from "./JWT";
import {githubSignin} from "./auth/github/signin";
import {googleSignin} from "./auth/google/signin";
import {gitlabSignin} from "./auth/gitlab/signin";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID as string,
      clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      // @ts-ignore
      async authorize(credentials: any) {
        console.log(`[next-auth::providers::Credentials] user/pass login for user ${credentials.emailAddress}`);

        const { emailAddress } = credentials as {
          emailAddress: string,
        };

        return {
          emailAddress,
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async function ({user, account, profile, email, credentials}) {
      console.log(`[next-auth::signIn] provider=${account?.provider}`);

      if (!account || !account.provider) {
        return false;
      }

      if (account.provider === 'github') {
        return githubSignin(user);
      } else if (account.provider === 'google') {
        return googleSignin(user);
      } else if (account.provider === 'gitlab') {
        return gitlabSignin(user);
      } else if (account.provider === 'credentials') {
        const { emailAddress, password } = credentials as {
          emailAddress: string,
          password: string,
        };

        // Github login path
        const loginDto = {
          emailAddress,
          password,
          source: account.provider,
        };

        // @ts-ignore
        const login = await ClientAuthLogin(loginDto)
          .then((x: any) => {
            console.log('[next-auth::signIn] credentials login successful.');
            return x;
          })
          .catch((x: any) => {
            console.log('[next-auth::signIn] credentials auth login fail', x);
            return null;
          });

        if (!login) {
          return false;
        }

        // #6 - retrieve tenancy information
        const tenancy = await ClientTenantListTenantsByUserId(login.id)
            .then((x) => x)
            .catch((x) => []);

        console.log('[next-auth::signIn] tenancy', tenancy);

        // If the user has no tenancy, return a failure.
        return (tenancy.length != 0);
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      console.log(`[next-auth::redirect]: url=${JSON.stringify(url)} baseUrl=${JSON.stringify(baseUrl)}`);

      if (url === '/login') {
        return baseUrl + '/login';
      }

      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log(`[next-auth::session]: session=${JSON.stringify(session, null, 2)} user=${JSON.stringify(user, null, 2)} token=${JSON.stringify(token, null, 2)}`);

      // Set session variables if not set, and the token contains the data necessary.
      (session as any).currentTenant = token.currentTenant ?? '';
      (session as any).objectified = token.objectified;

      return session;
    },
    // @ts-ignore
    async jwt({ token, user, account, profile, trigger, session }) {
      /**
       * Assignment of the JWT token should only take place once, when a user logs in for the first time.
       * The JWT token is created, extra data is assigned to the token, and returned.  Once returned, the
       * UI takes the token and encrypts it into a JWT token.  This token is assigned at the end of this
       * function, which checks the login, the objectified token, and all of its extra lookups.
       * JWT may take a few seconds to compute.
       */

      // A triggered update indicates that a session variable may have been altered.  If so, we look for
      // a specific variable - in this case, the tenant selected, and make a change as required to the
      // JWT token to store the current tenant that was changed.
      if (trigger === 'update' && session?.currentTenant) {
        console.log(`[next-auth::jwt] Target tenant changed to ${session.currentTenant}`);
        token.currentTenant = session.currentTenant;
      }

      const SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';

      if (!SECRET_KEY) {
        console.log('Objectified UI is misconfigured: edit your .env file to add a JWT_SECRET_KEY to encode JWT payloads.');
        return null;
      }

      console.log('token', token, 'user', user, 'account', account, 'profile', profile, 'trigger', trigger, 'session', session);

      if (account) {
        token.objectified = {
          emailAddress: profile?.email ?? (user as any).emailAddress,
          source: account.provider,
        };

        const encodedJwt = jwt.sign({ data: token }, SECRET_KEY);
        const result = await ClientUserGetUser({
          'Authorization': `Bearer ${encodedJwt}`,
        }).then((x) => {
          const resultData = x;
          return {
            id: resultData.id,
            data: resultData.data,
          };
        }).catch((x) => {
          console.log('User get user fail', x);
          return null;
        });

        if (!result) {
          console.log('User failed to authenticate via JWT');
        } else {
          token.objectified = {
            // @ts-ignore
            ...token.objectified,
            ...result,
          };

          // #6 - This applies tenancy to the session.  This function only returns a list of
          // tenants that are assigned to a specific user.
          const tenancy = await ClientTenantListTenantsByUserId((<any>token.objectified).id)
            .then((x) => {
              return x.map((y: any) => y.tenantId);
            })
            .catch((x: any) => {
              console.log('Tenant list failed', x);
              return [];
            });

          // Prepare the tenancy list to assign to the user's token.
          const tenancyList: any[] = [];

          // Retrieve the names of each tenant.
          for(const tenancyId of tenancy) {
            const tenantInfo = await ClientTenantGetTenantById(tenancyId)
              .then((x) => x.name)
              .catch((x) => `Unable to retrieve tenant ID ${tenancyId}`);

            tenancyList.push({
              id: tenancyId,
              name: tenantInfo,
            });
          }

          // Assign the tenancy.
          (<any>token.objectified).tenancy = tenancyList;

          // Assign the current tenant on login if the selected tenant was set in a previous session.
          if (token.objectified?.data) {
            if (token.objectified.data.selectedTenant) {
              token.currentTenant = token.objectified.data.selectedTenant;
            }
          }

          console.log('[next-auth::jwt] Assign Token', token);
        }
      }

      return token;
    }
  }
};

