import {
  ClientAuthLogin,
  ClientTenantListTenantsByUserId,
} from '@objectified-framework/objectified-services/dist/generated/clients';
import {commonSignin} from "../common";

export const gitlabSignin = async (user: any) =>
  commonSignin(<string>user['email'], 'gitlab');
