import {PropertyService, ServiceResponse} from "../generated/services";
import {PropertyDto} from "../generated/dto";
import { Request } from 'express';

export class PropertyServiceImpl implements PropertyService {

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
    return Promise.resolve(undefined);
  }

}