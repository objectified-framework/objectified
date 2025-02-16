import {ResponseCreated, ResponseForbidden, ResponseOk, ServiceResponse, SignupService} from "../generated/services";
import {SignupDto} from "../generated/dto";
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import {SignupDao} from "../generated/dao";

export class SignupServiceImpl implements SignupService {

  private readonly logger = new Logger(SignupServiceImpl.name);
  private readonly dao = new SignupDao();

  async saveSignup(request: Request, signupDto: SignupDto): Promise<ServiceResponse<null>> {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const payload: any = {
      emailAddress: signupDto.emailAddress,
      name: signupDto.name,
      source: signupDto.source,
      ipAddress:ip
    };

    const result = await this.dao.create(payload)
      .then((x) => {
        this.logger.log('[saveSignup] Signup created', x);
        return true;
      })
      .catch((x) => {
        this.logger.error('[saveSignup] Signup create failed', x);
        return false;
      });

    if (!result) {
      return Promise.resolve({
        returnValue: null,
        returnContentType: 'application/json',
        statusCode: 409,
      });

    }

    return ResponseCreated();
  }

}