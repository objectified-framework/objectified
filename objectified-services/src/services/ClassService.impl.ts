import {
  ClassService,
  ResponseForbidden,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse
} from "../generated/services";
import {ClassDto} from "../generated/dto";
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {ClassDao, TenantDao} from "../generated/dao";
import {JWT} from "../generated/util/JWT";

export class ClassServiceImpl implements ClassService {
  private readonly logger = new Logger(ClassServiceImpl.name);
  private readonly dao = new ClassDao();

  async createClass(request: Request, classDto: ClassDto): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  async disableClassById(request: Request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async editClassById(request: Request, id: string, classDto: ClassDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async getClassById(request: Request, id: string): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  async listClasses(request: Request): Promise<ServiceResponse<ClassDto[]>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    return await this.dao.findAll({
      tenantId,
    }).then((x) => {
      this.logger.log(`[listClasses] Classes for tenant ${tenantId}`, x);
      return ResponseOk(x);
    }).catch((x) => {
      this.logger.error(`[listClasses] Classes failed for tenant ${tenantId}`, x);
      return ResponseUnauthorized('Retrieval of classes failed.');
    });
  }

}