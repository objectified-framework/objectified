import {
  ClientAuthLogin,
  ClientTenantListTenantsByUserId,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export const googleSignin = async (user: any, account: any) => {
  const loginDto = {
    emailAddress: <string>user['email'],
    source: account.provider,
  };

  // @ts-ignore
  const login = await ClientAuthLogin(loginDto)
    .then((x) => {
      console.log('[next-auth::signIn] google provider login successful.');
      return x;
    })
    .catch((x) => {
      console.log('[next-auth::signIn] google provider auth login fail', x);
      return null;
    });

  if (!login) {
    return false;
  }

  // #6 - retrieve tenancy information
  const tenancy = await ClientTenantListTenantsByUserId(login.id)
    .then((x) => x)
    .catch((x) => []);

  // If the user has no tenancy, return a failure.
  return (tenancy.length != 0);
}
