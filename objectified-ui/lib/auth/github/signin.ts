import {commonSignin} from "../common";

export const githubSignin = async (user: any) =>
  commonSignin(<string>user['email'], 'github');
