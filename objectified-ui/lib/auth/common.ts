import {
  ClientAuthLogin,
  ClientTenantListTenantsByUserId,
} from '@objectified-framework/objectified-services/dist/generated/clients';

export const commonSignin = async (email: string, provider: string) => {
  const loginDto = {
    emailAddress: email,
    source: provider,
  };

  // @ts-ignore
  const login = await ClientAuthLogin(loginDto)
    .then((x) => {
      console.log(`[next-auth::signIn] ${provider} login successful.`);
      return x;
    })
    .catch((x) => {
      console.log(`[next-auth::signIn] ${provider} auth login fail`, x);
      return null;
    });

  if (!login) {
    return false;
  }

  // #6 - retrieve tenancy information
  const tenancy = await ClientTenantListTenantsByUserId(login.id)
    .then((x: any) => x)
    .catch((x: any) => []);

  // If the user has no tenancy, return a failure.
  return (tenancy.length != 0);

}