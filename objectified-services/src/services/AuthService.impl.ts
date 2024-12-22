import { Logger } from '@nestjs/common';
import {AuthService, ResponseOk, ResponseUnauthorized, ServiceResponse} from '../generated/services';
import { Request } from 'express';
import {UserDao} from "../generated/dao";
import {UserDto} from "../generated/dto";

export class AuthServiceImpl implements AuthService {
  private readonly logger = new Logger(AuthServiceImpl.name);

  async login(request: Request, userDto: UserDto): Promise<ServiceResponse<string>> {
    const dao = new UserDao();

    // This is the "where" clause
    const findStatement: any = {
      email_address: userDto.emailAddress,
    };

    return await dao.findOne(findStatement)
      .then((x: any) => {
        if (x) {
          if (x.source.includes(userDto.source)) {
            const resultResponse: any = {
              id: x.id,
              data: x.data,
            };

            this.logger.log(`[login] User ${userDto.emailAddress} successful`);
            return ResponseOk(JSON.stringify(resultResponse));
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