import { Logger } from '@nestjs/common';
import {AuthService, ResponseForbidden, ResponseOk, ResponseUnauthorized, ServiceResponse} from '../generated/services';
import { Request } from 'express';
import {UserDao} from "../generated/dao";
import {UserDto} from "../generated/dto";
import * as bcrypt from 'bcrypt';

export class AuthServiceImpl implements AuthService {
  private readonly logger = new Logger(AuthServiceImpl.name);

  /**
   * This is the implementation of the login service.  It checks the email address along with the source.  If the
   * source specified doesn't match the list of allowed sources, the account login fails.
   *
   * @param request The active request object.
   * @param userDto The User DTO.
   */
  async login(request: Request, userDto: UserDto): Promise<ServiceResponse<string>> {
    const dao = new UserDao();
    const findStatement: any = {
      email_address: userDto.emailAddress,
    };

    if (!userDto.source) {
      return ResponseForbidden('Missing login credentials');
    }

    return await dao.findOne(findStatement)
      .then(async (x: any) => {
        if (x) {
          if (x.source) {
            x.source = x.source.replaceAll('{', '').replaceAll('}', '');
          }

          if (x.source.includes(userDto.source)) {
            const resultResponse: any = {
              id: x.id,
              data: x.data,
            };

            // Credential login comparison is done here.  We check the password against the encrypted
            // password using the local compare function.  Only if the user is authenticated will they
            // be allowed in.  Otherwise, an unauthorized response is given.
            if (userDto.source.includes(["credentials"])) {
              const match = await bcrypt.compare(userDto.password, x.password);

              if (match) {
                this.logger.log(`[login] User ${userDto.emailAddress} successful via credentials`);
                return ResponseOk(resultResponse);
              }

              this.logger.error(`[login] User ${userDto.emailAddress} unsuccessful login attempt - password mismatch`);
              return ResponseUnauthorized('Your username and/or password are invalid');
            }

            // Alternative sources could have been sent via other authentication methods, such as github, gitlab, or
            // azure.  Anything that does not require a database lookup for further logins is handled here.
            // The source must be an allowed, known source for the user.  Otherwise, the login attempt fails.
            if (userDto.source.includes(x.source)) {
              this.logger.log(`[login] User ${userDto.emailAddress} successful`);
              return ResponseOk(resultResponse);
            }

            this.logger.error(`[login] User ${userDto.emailAddress} failed.  Expected source(s)=${x.source}, sent=${userDto.source}`);
            return ResponseUnauthorized('You are not permitted to login.');
          } else {
            this.logger.error(`[login] User ${userDto.emailAddress} failed.  Expected source(s)=${x.source}, sent=${userDto.source}`);
            return ResponseUnauthorized('You are not permitted to login.');
          }
        } else {
          this.logger.error(`[login] User ${userDto.emailAddress} attempted, not in database`);
          return ResponseUnauthorized('You are not permitted to login.');
        }
      })
      .catch((x: any) => {
        this.logger.error(`[login] DB error: ${findStatement}`, x);
        return ResponseUnauthorized('You are not permitted to login.');
      });
  }
}