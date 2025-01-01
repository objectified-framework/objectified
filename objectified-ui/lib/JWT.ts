/**
 * This utility security scheme file is automatically generated.
 * Do not modify this file, any changes will be overwritten.
 *
 * Generated Mon Dec 30 2024 20:51:25 GMT-0700 (Mountain Standard Time)
 */


import { sign } from 'jsonwebtoken';

// JWT Secret Key: either JWT_SECRET_KEY in environment variable, or generated randomly on restart using faker.
export const SECRET_KEY = process.env.JWT_SECRET_KEY ?? '=Gz}Un"NZW0qN:hY[UhISXW2bJnASjUD57iDx(8B=jV;3;_|RFdp_mSW2k\\r43S^';

export class JWT {
  /**
   * Encrypts a JWT token with the given payload and possible timeout given as a string or numeric value.
   *
   * @param payload The data to encode into the JWT token
   * @param timeout The optional timeout for the JWT token as a string expression or numeric value in milliseconds
   * @returns The JWT token string
   */
  public static encrypt(payload: any, timeout?: string | number): string {
    if (timeout) {
      return sign({ data: payload }, SECRET_KEY, { expiresIn: timeout });
    }

    return sign({ data: payload }, SECRET_KEY);
  }
}
