import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import {LoginDto} from '@objectified-framework/objectified-services/dist/generated/dto';
import { ClientAuthLogin, ClientUserGetUser } from '@objectified-framework/objectified-services/dist/generated/clients';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`signIn: user=${JSON.stringify(user, null, 2)} account=${JSON.stringify(account, null, 2)} profile=${JSON.stringify(profile, null, 2)} email=${JSON.stringify(email)} credentials=${JSON.stringify(credentials, null, 2)}`);

      if (account.provider === 'github') {
        // Github login path
        const loginDto: LoginDto = {
          emailAddress: <string>user['email'],
          source: ['github'],
        };

        return await ClientAuthLogin(loginDto)
          .then((x) => {
            console.log('Auth login', x);
            return true;
          })
          .catch((x) => {
            console.log('Auth login fail', x);
            return false;
          });
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      console.log(`redirect: url=${JSON.stringify(url)} baseUrl=${JSON.stringify(baseUrl)}`);
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log(`session: session=${JSON.stringify(session, null, 2)} user=${JSON.stringify(user, null, 2)} token=${JSON.stringify(token, null, 2)}`);

      session.objectified = token.objectified;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';

      if (!SECRET_KEY) {
        console.log('Objectified UI is misconfigured: edit your .env file to add a JWT_SECRET_KEY to encode JWT payloads.');
        return null;
      }

      if (account) {
        token.objectified = {
          emailAddress: profile.email,
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
            ...token.objectified,
            ...result,
          };

          console.log('Token', token);
        }
      }

      return token;
    }
  }
};

