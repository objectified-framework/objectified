import {AuthService, ServiceResponse} from "../generated/services";
import {LoginDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";

export class AuthServiceImpl implements AuthService {

  /**
   * Logs a user into the system via their username and password combination.
   *
   * - Response code '200': 'OK, returns the JWT session token that must be stored on the client.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param loginDto The user credentials with which to login.
   */
  login(loginDto: LoginDto): ServiceResponse<string> {
    return {
      returnValue: 'token',
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Allows a user to change their login credentials.  Only the password can be changed.
   * If the username does not match, the request will be ignored, and a `400 Bad Request`
   * will be returned.
   *
   * - Response code '200': 'OK, returns the JWT session token that must be stored on the client.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param loginDto The user credentials with which to change.
   */
  editLogin(loginDto: LoginDto): ServiceResponse<string> {
    return {
      returnValue: 'OK',
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Refreshes a login token internally so it does not time out.
   *
   * - Response code '204': 'No content, refresh succeeded'
   * - Response code '401': 'Unauthorized'
   */
  refreshLogin(): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Removes the login token and logs a user out of the system
   *
   * - Response code '204': 'No content, logout succeeded'
   * - Response code '400': 'Bad request'
   */
  logout(): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}