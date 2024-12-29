import {ServiceResponse, TenantService} from "../generated/services";
import {TenantDto, TenantUserDto} from "../generated/dto";
import { Request } from 'express';

export class TenantServiceImpl implements TenantService {
  addUserToTenantId(request, id: string, tenantUserDto: TenantUserDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  createTenant(request, tenantDto: TenantDto): Promise<ServiceResponse<TenantDto>> {
    return Promise.resolve(undefined);
  }

  disableTenantById(request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  editTenant(request, id: string, tenantDto: TenantDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  getTenantById(request, id: string): Promise<ServiceResponse<TenantDto>> {
    return Promise.resolve(undefined);
  }

  listTenants(request): Promise<ServiceResponse<TenantDto[]>> {
    return Promise.resolve(undefined);
  }

  listUsersByTenantId(request, id: string): Promise<ServiceResponse<TenantUserDto[]>> {
    return Promise.resolve(undefined);
  }

  removeUserFromTenant(request, id: string, userId: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

}