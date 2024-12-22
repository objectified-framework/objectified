import { AuthService, ServiceResponse } from '../generated/services';
import { LoginDto } from '../generated/dto';
import { Request } from 'express';
import {AuthLogin} from "../generated/clients";

export class AuthServiceImpl implements AuthService {
  async login(request: Request, loginDto: LoginDto): Promise<ServiceResponse<string>> {
    console.log(`Login DTO`, loginDto);

    return Promise.resolve({
      returnValue: 'You are not permitted to login',
      returnContentType: 'application/json',
      statusCode: 400,
    });
  }
}