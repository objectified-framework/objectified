import {
  PropertyService,
  ResponseForbidden,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse
} from "../generated/services";
import {PropertyDto} from "../generated/dto";
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {JWT} from "../generated/util/JWT";
import {PropertyDao} from "../generated/dao";

export class PropertyServiceImpl implements PropertyService {
  private readonly logger = new Logger(PropertyServiceImpl.name);
  private readonly dao = new PropertyDao();

  async createProperty(request: Request, propertyDto: PropertyDto): Promise<ServiceResponse<PropertyDto>> {
    return Promise.resolve(undefined);
  }

  async disablePropertyById(request: Request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async editPropertyById(request: Request, id: string, propertyDto: PropertyDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  async getPropertyById(request: Request, id: string): Promise<ServiceResponse<PropertyDto>> {
    return Promise.resolve(undefined);
  }

  async listProperties(request: Request): Promise<ServiceResponse<PropertyDto[]>> {
    const jwtData = JWT.decrypt(request);
    const tenantId = jwtData.data.currentTenant;

    if (!tenantId) {
      return ResponseForbidden('No tenant selected');
    }

    return await this.dao.findAll({
      tenantId,
    }).then((x) => {
      this.logger.log(`[listProperties] Properties for tenant ${tenantId}`, x);
      return ResponseOk(x);
    }).catch((x) => {
      this.logger.error(`[listProperties] Properties failed for tenant ${tenantId}`, x);
      return ResponseUnauthorized('Retrieval of properties failed.');
    });
  }

}