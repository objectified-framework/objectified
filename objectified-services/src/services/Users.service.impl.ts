import {Injectable, Logger} from '@nestjs/common';
import {UsersService} from "../generated/services";
import {UserDto} from "../generated/dto";

@Injectable()
export class UsersServiceImpl implements UsersService {
  private readonly logger = new Logger('UsersServiceImpl');

  /**
   * Returns a list of all users registered in Objectified, regardless of
   * enabled status.  Only users with administrative privileges may list users.
   */
  listUsers(): UserDto[] {
    return [];
  }

  /**
   * Creates a new `User` record in the Objectified platform.
   */
  createUser(userDto: UserDto): void {}

  /**
   * Retrieves a user by its user ID.
   */
  getUserById(userId: bigint): UserDto {
    return null;
  }

  /**
   * Applies changes to a user, only changing the values supplied in the
   * request body. Only administrators may make changes to user records
   * that do not belong to them. Use the `PUT` method to reactivate users
   * who have been deleted.
   */
  editUser(userId: bigint, userDto: UserDto): void {}

  /**
   * Disables a user.
   */
  disableUser(userId: bigint): void {}
}
