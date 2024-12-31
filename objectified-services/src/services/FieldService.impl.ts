import {
  FieldService,
  ResponseForbidden,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse
} from '../generated/services';
import {FieldDto} from '../generated/dto';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {FieldDao} from '../generated/dao';
import {JWT} from "../generated/util/JWT";

export class FieldServiceImpl implements FieldService {
  private readonly logger = new Logger(FieldServiceImpl.name);
  private readonly dao = new FieldDao();

  async createField(request: Request, fieldDto: FieldDto): Promise<ServiceResponse<FieldDto>> {
    return Promise.resolve(undefined);
  }

  async disableFieldById(request: Request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async editFieldById(request: Request, id: string, fieldDto: FieldDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async getFieldById(request: Request, id: string): Promise<ServiceResponse<FieldDto>> {
    return Promise.resolve(undefined);
  }

  async listFields(request: Request): Promise<ServiceResponse<FieldDto[]>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    return await this.dao.findAll({
      tenantId,
    }).then((x) => {
      this.logger.log(`[listFields] Fields for tenant ${tenantId}`, x);
      return ResponseOk(x);
    }).catch((x) => {
      this.logger.error(`[listFields] Fields failed for tenant ${tenantId}`, x);
      return ResponseUnauthorized('Retrieval of fields failed.');
    });
  }

}