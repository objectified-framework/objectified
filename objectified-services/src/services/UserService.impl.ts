import { Logger } from '@nestjs/common';
import {ServiceResponse, UserService} from "../generated/services";
import {UserDto} from "../generated/dto";
import { Request } from 'express';
import {JWT} from "../generated/util/JWT";

export class UserServiceImpl implements UserService {
  private readonly logger = new Logger(UserServiceImpl.name);

  async getUser(request): Promise<ServiceResponse<UserDto>> {
    const decryptedJwt = JWT.decrypt(request);

    this.logger.log('Decrypted JWT', decryptedJwt);

    return Promise.resolve(undefined);
  }
}