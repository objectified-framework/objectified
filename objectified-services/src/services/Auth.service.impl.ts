import { AuthService } from '@objectified/objectified-api/dist/generated/services';
import { LoginDto } from '@objectified/objectified-api/dist/generated/dto';

export class AuthServiceImpl implements AuthService {
  /**
   * Logs a user into the system via their username and password combination.
   */
  login(loginDto: LoginDto): string {
    return '';
  }

  /**
   * Allows a user to change their login credentials.  Only the password can be changed.
   * If the username does not match, the request will be ignored, and a `400 Bad Request`
   * will be returned.
   */
  editLogin(loginDto: LoginDto): string {
    return '';
  }

  /**
   * Refreshes a login token internally so it does not time out.
   */
  refreshLogin(): void {

  }

  /**
   * Removes the login token and logs a user out of the system
   */
  logout(): void {

  }

}