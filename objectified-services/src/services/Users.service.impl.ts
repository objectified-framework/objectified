import {ServiceResponse, UsersService} from "../generated/services";
import {UserDto} from "../generated/dto";
import {HttpStatus, Logger} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";
import {UserDao} from "../dao";
import {DaoUtils} from "../dao/dao-utils";
import { Request } from 'express';

export class UsersServiceImpl implements UsersService {

  private readonly logger = new Logger('UserServiceImpl');

  /**
   * Returns a list of all users registered in Objectified, regardless of
   * enabled status.  Only users with administrative privileges may list users.
   *
   * - Response code '200': 'An array of users registered in Objectified.'
   * - Response code '401': 'Unauthorized'
   */
  async listUsers(request: Request, ): Promise<ServiceResponse<UserDto[]>> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Creates a new `User` record in the Objectified platform.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param userDto The `User` object to create.
   */
  async createUser(request: Request, userDto: UserDto): Promise<ServiceResponse<null>> {
    const dao = new UserDao(DaoUtils.getDatabase());
    const user = await dao.create(userDto);

   this.logger.log(`User created=${JSON.stringify(user, null, 2)}`);

    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Retrieves a user by its user ID.
   *
   * - Response code '200': 'OK'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'User not found'
   *
   * @param userId The ID of the user.
   */
  async getUserById(request: Request, userId: bigint): Promise<ServiceResponse<UserDto>> {
    return {
      returnValue: <UserDto>JSONSchemaFaker.generate(UserDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Applies changes to a user, only changing the values supplied in the
   * request body. Only administrators may make changes to user records
   * that do not belong to them. Use the `PUT` method to reactivate users
   * who have been deleted.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param userId The ID of the user.
   * @param userDto The user changes to apply.
   */
  async editUser(request: Request, userId: bigint, userDto: UserDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Disables a user.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param userId The ID of the user.
   */
  async disableUser(request: Request, userId: bigint): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}