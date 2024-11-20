import {ServiceResponse, SessionsService} from "../generated/services";
import {SessionDto} from "../generated/dto";
import { Request } from 'express';
import {getJwt} from "./ServicesUtils";
import * as JWT from '../generated/util/JWT';
import {SessionManager} from "../dao/SessionManager";

export class SessionsServiceImpl implements SessionsService {

  async getSession(request: Request): Promise<ServiceResponse<SessionDto>> {
    const jwt = getJwt(request);

    if (jwt) {
      const payload = JWT.decrypt(request);
    }

    return Promise.resolve(undefined);
  }

  async updateSession(request: Request, sessionDto: SessionDto): Promise<ServiceResponse<SessionDto>> {
    return Promise.resolve(undefined);
  }

}