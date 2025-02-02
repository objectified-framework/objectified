import {ClassPropertyService, ResponseForbidden, ResponseOk, ServiceResponse} from "../generated/services";
import {ClassPropertyDto} from "../generated/dto";
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {ClassPropertyDao} from "../generated/dao";
import {JWT} from "../generated/util/JWT";

export class ClassPropertyServiceImpl implements ClassPropertyService {
  private readonly logger = new Logger(ClassPropertyServiceImpl.name);
  private readonly dao = new ClassPropertyDao();

  async addPropertyToClass(request: Request, classId: string, propertyId: string): Promise<ServiceResponse<null>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const payload: any = {
      classId,
      propertyId,
    };

    const result = await this.dao.create(payload)
      .then((x) => {
        this.logger.log('[addPropertyToClass] Class property created', x);
        return x;
      })
      .catch((x) => {
        this.logger.error('[addPropertyToClass] Class property create failed', x);
        return null;
      });

    if (!result) {
      return ResponseForbidden('Creation of class property failed');
    }

    return ResponseOk(result);
  }

  async deletePropertyFromClass(request: Request, classId: string, propertyId: string): Promise<ServiceResponse<null>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    return Promise.resolve(undefined);
  }

  async getPropertiesForClass(request: Request, id: string): Promise<ServiceResponse<ClassPropertyDto[]>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const resultSearch = {
      classId: id,
    };
    const results = (await this.dao.findAll(resultSearch)) ?? [];

    this.logger.log(`[getPropertiesForClass] List retrieved`, results);

    return ResponseOk(results);
  }
}