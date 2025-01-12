import {
  ClassService,
  ResponseForbidden, ResponseNoContent, ResponseNotFound,
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
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const payload: any = {
      tenantId,
      ownerId: classDto.ownerId,
      name: classDto.name,
      description: classDto.description,
      enabled: true,
    };

    const result = await this.dao.create(payload)
      .then((x) => {
        this.logger.log('[createClass] Class created', x);
        return x;
      })
      .catch((x) => {
        this.logger.error('[createClass] Class create failed', x);
        return null;
      });

    if (!result) {
      return ResponseForbidden('Creation of class failed');
    }

    return ResponseOk(result);
  }

  async disableClassById(request: Request, id: string): Promise<ServiceResponse<null>> {
    this.logger.log(`[disableClassById] id=${id}`);

    const result = await this.dao.getById(id)
      .then((x) => {
        this.logger.log(`[disableClassById] Object retrieved by ID=${id}`);
        return x;
      })
      .catch((x) => {
        this.logger.error('[disableClassById] Object failed to retrieve', x);
        return null;
      });

    if (!result) {
      return ResponseNotFound(id);
    }

    result.enabled = false;
    result.deleteDate = new Date();

    return await this.dao.updateById(id, result)
      .then((x) => {
        this.logger.log(`[disableClassById] Object disabled ID=${id}`);
        return ResponseNoContent();
      })
      .catch((x) => {
        this.logger.error(`[disableClassById] Unable to disable ID=${id}`, x);
        return ResponseForbidden('Cannot disable this data type');
      });
  }

  async editClassById(request: Request, id: string, classDto: ClassDto): Promise<ServiceResponse<null>> {
    this.logger.log(`[editClassById] id=${id} classDto=${JSON.stringify(classDto, null, 2)}`);

    const replacePayload: any = {
      name: classDto.name,
      description: classDto.description,
      updateDate: new Date(),
    }

    const result = await this.dao.updateById(id, replacePayload)
      .then((x) => {
        console.log('[editClassById] Update', x);
        return x;
      })
      .catch((x) => {
        console.log('[editClassById] Update fail', x);
        return null;
      })

    if (!result) {
      return ResponseForbidden('Unable to update class.');
    }

    return ResponseOk(result);
  }

  async getClassById(request: Request, id: string): Promise<ServiceResponse<ClassDto>> {
    this.logger.log(`[getClassById] id=${id}`);
    return Promise.resolve(undefined);
  }

  async listClasses(request: Request): Promise<ServiceResponse<ClassDto[]>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    this.logger.log(`[getClassById] tenantId=${tenantId}`);

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