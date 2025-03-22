import {commonSignin} from "../common";

export const googleSignin = async (user: any) =>
  commonSignin(<string>user['email'], 'google');
