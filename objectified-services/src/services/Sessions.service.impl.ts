import {ServiceResponse, SessionsService} from "../generated/services";
import {SessionDto} from "../generated/dto";
import { Request } from 'express';

export class SessionsServiceImpl implements SessionsService {

  async getSession(request: Request): Promise<ServiceResponse<SessionDto>> {
    return Promise.resolve(undefined);
  }

  async updateSession(request: Request, sessionDto: SessionDto): Promise<ServiceResponse<SessionDto>> {
    return Promise.resolve(undefined);
  }

}