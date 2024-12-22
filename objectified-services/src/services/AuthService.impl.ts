import {AuthService, ResponseOk, ServiceResponse} from '../generated/services';
import { LoginDto } from '../generated/dto';
import { Request } from 'express';
import {AuthLogin} from "../generated/clients";
import {DaoUtils, LoginDao} from "../generated/dao";

export class AuthServiceImpl implements AuthService {
  async login(request: Request, loginDto: LoginDto): Promise<ServiceResponse<string>> {
    console.log(`Login DTO: ${JSON.stringify(loginDto, null, 2)}`);

    const dao = new LoginDao();
    const findStatement = `email_address=${loginDto.emailAddress} AND source IN ("${loginDto.source}")`;

    return await dao.findOne(findStatement)
      .then((x) => {
        console.log('Result', x);

        if (x) {
          return ResponseOk(x.id);
        } else {
          return {
            returnValue: 'You are not permitted to login',
            returnContentType: 'application/json',
            statusCode: 400,
          };
        }
      })
      .catch((x) => {
        console.log(`Result error: ${findStatement}`, x);
        return {
          returnValue: 'You are not permitted to login',
          returnContentType: 'application/json',
          statusCode: 400,
        };
      });
  }
}