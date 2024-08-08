import {AuthService, ServiceResponse} from "../generated/services";
import {LoginDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {ClassDao, UserDao} from "../dao";
import {DaoUtils} from "../dao/dao-utils";
import { Request } from 'express';
import * as JWT from '../generated/util/JWT';

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
  async login(request: Request, loginDto: LoginDto): Promise<ServiceResponse<string>> {
    const dao = new UserDao(DaoUtils.getDatabase());
    const user = (loginDto.username.includes('@')) ? await dao.getByEmail(loginDto.username) : await dao.getByUsername(loginDto.username);

    if (!user || user.password !== loginDto.password) {
      return {
        returnValue: null,
        returnContentType: 'application/json',
        statusCode: HttpStatus.UNAUTHORIZED,
        statusMessage: 'Invalid username or password',
      };
    }

    const payload = {
      ip: request.socket.remoteAddress,
      payload: JSON.stringify(user),
    }

    // TODO: Add database to store active sessions with timeouts

    return {
      returnValue: JWT.encrypt(payload),
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
  async editLogin(request: Request, loginDto: LoginDto): Promise<ServiceResponse<string>> {
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
  async refreshLogin(request: Request, ): Promise<ServiceResponse<null>> {
    // TODO: Refresh session timeout in database

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
  async logout(request: Request, ): Promise<ServiceResponse<null>> {
    // TODO: Remove session from database

    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}