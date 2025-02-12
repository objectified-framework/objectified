import {
  FieldService,
  ResponseForbidden, ResponseNoContent, ResponseNotFound,
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
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const payload: any = {
      tenantId,
      dataTypeId: fieldDto.dataTypeId,
      name: fieldDto.name,
      description: fieldDto.description,
      dataFormat: fieldDto.dataFormat,
      pattern: fieldDto.pattern,
      enumValues: fieldDto.enumValues,
      enumDescriptions: fieldDto.enumDescriptions,
      examples: fieldDto.examples,
      enabled: true,
    };

    const result = await this.dao.create(payload)
      .then((x) => {
        this.logger.log('[createField] Field created', x);
        return x;
      })
      .catch((x) => {
        this.logger.error('[createField] Field create failed', x);
        return null;
      });

    if (!result) {
      return ResponseForbidden('Creation of field failed');
    }

    return ResponseOk(result);
  }

  async disableFieldById(request: Request, id: string): Promise<ServiceResponse<null>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const payload: any = {
      enabled: false,
    };

    return await this.dao.updateById(id, payload)
      .then((x) => {
        this.logger.log(`[disableFieldById] Disabled ${id}`, x);
        return ResponseNoContent();
      })
      .catch((x) => {
        this.logger.error(`[disableFieldById] Disable for field ${id} failed`, x);
        return ResponseForbidden('Unable to disable field.');
      });
  }

  async editFieldById(request: Request, id: string, fieldDto: FieldDto): Promise<ServiceResponse<null>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const payload: any = {
      tenantId,
      dataTypeId: fieldDto.dataTypeId,
      name: fieldDto.name,
      description: fieldDto.description,
      dataFormat: fieldDto.dataFormat,
      pattern: fieldDto.pattern,
      enumValues: fieldDto.enumValues,
      enumDescriptions: fieldDto.enumDescriptions,
      examples: fieldDto.examples,
    };

    return await this.dao.updateById(id, payload)
      .then((x) => {
        this.logger.log(`[editFieldById] Edited ${id}`, x);
        return ResponseNoContent();
      })
      .catch((x) => {
        this.logger.error(`[editFieldById] Edit for field ${id} failed`, x);
        return ResponseForbidden('Unable to edit field.');
      });
  }

  async getFieldById(request: Request, id: string): Promise<ServiceResponse<FieldDto>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    const result = await this.dao.getById(id)
      .then((x) => {
        this.logger.log(`[getFieldById] Field retrieved for ${id}`, x);
        return x;
      })
      .catch((x) => {
        this.logger.error(`[getFieldById] Field retrieve failed for ${id}`, x);
        return null;
      });

    if (!result) {
      return ResponseNotFound(id);
    }

    if (result.tenantId !== tenantId) {
      return ResponseForbidden('You do not have permission to retrieve this field.');
    }

    return ResponseOk(result);
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