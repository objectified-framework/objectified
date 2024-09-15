import {AuthService, ResponseNoContent, ResponseOk, ServiceResponse} from "../generated/services";
import {LoginDto} from "../generated/dto";
import {HttpStatus, Logger} from "@nestjs/common";
import {UserDao} from "../dao";
import {DaoUtils} from "../dao/dao-utils";
import { Request } from 'express';
import * as JWT from '../generated/util/JWT';
import bcrypt = require('bcrypt');

export class AuthServiceImpl implements AuthService {

  private readonly logger = new Logger(AuthServiceImpl.name);

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
    const decodedPassword = Buffer.from(loginDto.password, 'base64').toString('utf-8');

    if (!user || !bcrypt.compareSync(decodedPassword, user.password)) {
      this.logger.log(`Login failure attempt for user ${loginDto.username} (${request.socket.remoteAddress})`);

      return {
        returnValue: null,
        returnContentType: 'application/json',
        statusCode: HttpStatus.UNAUTHORIZED,
        statusMessage: 'Invalid username or password',
      };
    }

    this.logger.debug(`User and Pass match for user ${loginDto.username}`);

    const payload = {
      ip: request.socket.remoteAddress,
      payload: JSON.stringify(user),
    };

    return ResponseOk(JWT.encrypt(payload));
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
    return ResponseOk('OK');
  }

  /**
   * Refreshes a login token internally so it does not time out.
   *
   * - Response code '204': 'No content, refresh succeeded'
   * - Response code '401': 'Unauthorized'
   */
  async refreshLogin(request: Request, ): Promise<ServiceResponse<null>> {
    // TODO: Refresh session timeout in database

    return ResponseNoContent();
  }

  /**
   * Removes the login token and logs a user out of the system
   *
   * - Response code '204': 'No content, logout succeeded'
   * - Response code '400': 'Bad request'
   */
  async logout(request: Request, ): Promise<ServiceResponse<null>> {
    // TODO: Remove session from database

    return ResponseNoContent();
  }

}