import {AuthService} from "../generated/services";
import {LoginDto} from "../generated/dto";

export class AuthServiceImpl implements AuthService {

  /**
   * Logs a user into the system via their username and password combination.
   *
   * @param loginDto The user credentials with which to login.
   * @returns string
   */
  login(loginDto: LoginDto): {
    returnValue: string,
    returnContentType: string,
    statusCode: number,
    statusMessage: any | null
  } {
    return {};
  }

  /**
   * Allows a user to change their login credentials.  Only the password can be changed.
   * If the username does not match, the request will be ignored, and a `400 Bad Request`
   * will be returned.
   *
   * @param loginDto The user credentials with which to change.
   * @returns string
   */
  editLogin(loginDto: LoginDto): {
    returnValue: string,
    returnContentType: string,
    statusCode: number,
    statusMessage: any | null
  } {
    return {};
  }

  /**
   * Refreshes a login token internally so it does not time out.
   *
   */
  refreshLogin(): {
    returnValue: null,
    returnContentType: string,
    statusCode: number,
    statusMessage: any | null
  } {
    return {};
  }

  /**
   * Removes the login token and logs a user out of the system
   *
   */
  logout(): {
    returnValue: null,
    returnContentType: string,
    statusCode: number,
    statusMessage: any | null
  } {
    return {};
  }

}