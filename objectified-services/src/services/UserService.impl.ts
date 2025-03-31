import { Logger } from '@nestjs/common';
import {ResponseNoContent, ResponseOk, ResponseUnauthorized, ServiceResponse, UserService} from "../generated/services";
import {UserDto, UserPasswordDto} from "../generated/dto";
import {JWT} from "../generated/util/JWT";
import {UserDao} from "../generated/dao";
import * as bcrypt from 'bcrypt';

export class UserServiceImpl implements UserService {
  private readonly logger = new Logger(UserServiceImpl.name);

  async putUserPassword(request, userPasswordDto: UserPasswordDto): Promise<ServiceResponse<null>> {
    this.logger.log("[putUserPassword] userPasswordDto", userPasswordDto);

    const decryptedJwt = JWT.decrypt(request);
    const userId = decryptedJwt['data']['objectified']['id'];

    if (!userId) {
      return ResponseUnauthorized('Invalid JWT');
    }

    const dao = new UserDao();
    const result = await dao.getById(userId)
      .then((x) => x)
      .catch((x) => null);

    if (!result) {
      return ResponseUnauthorized('Unable to change password: user lookup failure.');
    }

    let source = result.source;

    source = source.replaceAll('{', '').replaceAll('}', '');

    const sources = source.split(',');

    if (!sources.includes('credentials')) {
      return ResponseUnauthorized('You are not authorized to login with a username and password.');
    }

    const match = await bcrypt.compare(userPasswordDto.currentPassword, result.password);

    if (!match) {
      return ResponseUnauthorized('Current password is not valid.');
    }

    if (userPasswordDto.password1 === userPasswordDto.password2) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(userPasswordDto.password1, salt);
      const newDto = {
        id: userId,
        password: hashPassword,
      };

      return await dao.updateById(userId, newDto)
        .then((x) => {
          this.logger.log(`[putUser] Password altered for ID ${userId}`);
          return ResponseNoContent();
        }).catch((x) => {
          this.logger.error('[putUser] Failed to alter password.', x);
          return ResponseUnauthorized('You are not authorized to use this service.');
        });
    }

    return ResponseUnauthorized('Password mismatch.');

    // const result = await dao.findOne(findStatement)
    //   .then(async (x: any) => {
    //     if (x) {
    //       if (x.source) {
    //         x.source = x.source.replaceAll('{', '').replaceAll('}', '');
    //       }
    //
    //       const sources = x.source.split(',');
    //
    //       if (sources.includes(userDto.source)) {
    //         const resultResponse: any = {
    //           id: x.id,
    //           data: x.data,
    //         };
    //
    //         // Credential login comparison is done here.  We check the password against the encrypted
    //         // password using the local compare function.  Only if the user is authenticated will they
    //         // be allowed in.  Otherwise, an unauthorized response is given.
    //         if (userDto.source.includes(["credentials"])) {
    //           const match = await bcrypt.compare(userDto.password, x.password);
    //
    //           if (match) {
    //             this.logger.log(`[login] User ${userDto.emailAddress} successful via credentials`);
    //             return ResponseOk(resultResponse);
    //           }
    //
    //           this.logger.error(`[login] User ${userDto.emailAddress} unsuccessful login attempt - password mismatch`);
    //           return ResponseUnauthorized('Your username and/or password are invalid');
    //         }
    //
    //         // Alternative sources could have been sent via other authentication methods, such as github, gitlab, or
    //         // azure.  Anything that does not require a database lookup for further logins is handled here.
    //         // The source must be an allowed, known source for the user.  Otherwise, the login attempt fails.
    //         if (sources.includes(userDto.source)) {
    //           this.logger.log(`[login] User ${userDto.emailAddress} successful via source ${userDto.source}`);
    //           return ResponseOk(resultResponse);
    //         }
    //
    //         this.logger.error(`[login] User ${userDto.emailAddress} failed.  Expected source(s)=${x.source}, sent=${userDto.source}`);
    //         return ResponseUnauthorized('You are not permitted to login.');
    //       } else {
    //         this.logger.error(`[login] User ${userDto.emailAddress} failed.  Expected source(s)=${x.source}, sent=${userDto.source}`);
    //         return ResponseUnauthorized('You are not permitted to login.');
    //       }
    //     } else {
    //       this.logger.error(`[login] User ${userDto.emailAddress} attempted, not in database`);
    //       return ResponseUnauthorized('You are not permitted to login.');
    //     }
    //   })
    //   .catch((x: any) => {
    //     this.logger.error(`[login] DB error: ${findStatement}`, x);
    //     return ResponseUnauthorized('You are not permitted to login.');
    //   });

    return ResponseUnauthorized('You are not authorized to change your password.');
  }

  async getUser(request): Promise<ServiceResponse<UserDto>> {
    try {
      const decryptedJwt = JWT.decrypt(request);

      if (!decryptedJwt) {
        this.logger.error('[getUser] Failed - JWT malformed, could not be decrypted.');
        return ResponseUnauthorized('Invalid JWT');
      }

      if (!decryptedJwt['data']) {
        this.logger.error('[getUser] Failed - JWT decrypted but missing data segment');
        return ResponseUnauthorized('Invalid JWT');
      }

      const objectifiedPayload = decryptedJwt['data']['objectified'];

      if (!objectifiedPayload) {
        this.logger.error('[getUser] Failed - JWT decrypted but missing required payload');
        return ResponseUnauthorized('Invalid JWT');
      }

      const emailAddress = objectifiedPayload.emailAddress;
      const source = objectifiedPayload.source;

      if (!emailAddress || !source) {
        this.logger.error('[getUser] Missing email or source');
        return ResponseUnauthorized('Invalid JWT');
      }

      const dao = new UserDao();

      // This is the "where" clause
      const findStatement: any = {
        email_address: emailAddress,
      };

      const result = await dao.findOne(findStatement)
        .then((x) => x)
        .catch((x) => null);

      if (result) {
        if (result.source.includes(source)) {
          this.logger.log(`[getUser] User '${emailAddress}' retrieved`);
          return ResponseOk(result);
        }

        this.logger.error(`[getUser] User '${emailAddress}' found, but source '${source}' not allowed.`);
        return ResponseUnauthorized('You are not authorized to login from this source.');
      } else {
        this.logger.error(`[getUser] User retrieval failed for user '${emailAddress}`);
      }
    } catch(e) {
      this.logger.error('Failed to decrypt sent JWT', e);
    }

    return ResponseUnauthorized('Invalid JWT');
  }

  async putUser(request, userDto: UserDto): Promise<ServiceResponse<null>> {
    if (!userDto.id) {
      this.logger.error('[putUser] No ID was sent in the payload.');
      return ResponseUnauthorized('You are not authorized to use this service.');
    }

    if (!userDto.data) {
      this.logger.error('[putUser] Payload empty');
      return ResponseUnauthorized('You are not authorized to use this service.');
    }

    const dao = new UserDao();
    const newDto = {
      id: userDto.id,
      data: userDto.data,
    };

    return await dao.updateById(userDto.id, newDto)
      .then((x) => {
        this.logger.log(`[putUser] Data persisted for ID ${userDto.id}`);
        return ResponseNoContent();
      }).catch((x) => {
        this.logger.error('[putUser] Failed to persist data.', x);
        return ResponseUnauthorized('You are not authorized to use this service.');
      });
  }

}