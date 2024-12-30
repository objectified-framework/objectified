import {
  ResponseForbidden,
  ResponseNoContent, ResponseNotFound,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse,
  TenantService
} from "../generated/services";
import {TenantDto, TenantUserDto} from "../generated/dto";
import { Request } from 'express';
import {DataTypeDao, TenantDao, TenantUserDao} from "../generated/dao";
import { Logger } from '@nestjs/common';

export class TenantServiceImpl implements TenantService {
  private readonly logger = new Logger(TenantServiceImpl.name);
  private readonly dao = new TenantDao();
  private readonly tenantUserDao = new TenantUserDao();

  async addUserToTenantId(request: Request, id: string, tenantUserDto: TenantUserDto): Promise<ServiceResponse<null>> {
    const payload = {
      tenantId: id,
      userId: tenantUserDto.userId,
    };

    return await this.tenantUserDao.create(payload)
      .then((x) => {
        this.logger.log('[addUserToTenantId] Tenant user record created', x);
        return ResponseOk(x);
      })
      .catch((x) => {
        this.logger.error('[addUserToTenantId] Tenant user record failed to create', x);
        return ResponseForbidden(x);
      });
  }

  async createTenant(request: Request, tenantDto: TenantDto): Promise<ServiceResponse<TenantDto>> {
    const payload = {
      ownerId: tenantDto.ownerId,
      name: tenantDto.name,
      data: tenantDto.data,
    };

    return await this.dao.create(payload)
      .then((x) => {
        this.logger.log('[createTenant] Tenant created', x);
        return ResponseOk(x);
      })
      .catch((x) => {
        this.logger.error('[createTenant] Tenant failed to create', x);
        return ResponseForbidden(x);
      });
  }

  async disableTenantById(request: Request, id: string): Promise<ServiceResponse<null>> {
    const disablePayload: any = {
      enabled: false,
    };

    return await this.dao.updateById(id, disablePayload)
      .then((x) => {
        this.logger.log(`[disableTenantById] Disabled tenant for ID ${id}`);
        return ResponseNoContent();
      }).catch((x) => {
        this.logger.error(`[disableTenantById] Failed to disable tenant for ID ${id}`, x);
        return ResponseUnauthorized('You are not authorized to use this service.');
      });
  }

  async editTenant(request: Request, id: string, tenantDto: TenantDto): Promise<ServiceResponse<null>> {
    const payload = {
      name: tenantDto.name,
      data: tenantDto.data,
    };

    return await this.dao.updateById(id, payload)
      .then((x) => {
        this.logger.log(`[editTenant] Tenant ${id} edited`, x);
        return ResponseOk(x);
      })
      .catch((x) => {
        this.logger.error(`[editTenant] Tenant ${id} failed to edit`, x);
        return ResponseUnauthorized(x);
      });
  }

  async getTenantById(request: Request, id: string): Promise<ServiceResponse<TenantDto>> {
    return await this.dao.getById(id)
      .then((x) => {
        if (!x) {
          return ResponseNotFound(id);
        }

        this.logger.log(`[getTenantById] Retrieved tenant by ID ${id}`, x);
        return ResponseOk(x);
      })
      .catch((x) => {
        this.logger.error(`[getTenantById] Failed to retrieve tenant by ID ${id}`, x);
        return ResponseNotFound(id);
      });
  }

  async listTenants(request: Request): Promise<ServiceResponse<TenantDto[]>> {
    const results = (await this.dao.getAll()) ?? [];

    this.logger.log(`[listTenants] List retrieved (size=${results ? results.length : 0})`);

    return ResponseOk(results);
  }

  async listUsersByTenantId(request: Request, id: string): Promise<ServiceResponse<TenantUserDto[]>> {
    const resultSearch = {
      tenantId: id,
    };
    const results = (await this.tenantUserDao.findAll(resultSearch)) ?? [];

    this.logger.log(`[listUsersByTenantId] List retrieved`, results);

    return ResponseOk(results);
  }

  async removeUserFromTenant(request: Request, id: string, userId: string): Promise<ServiceResponse<null>> {
    const result = await this.tenantUserDao.findOne({
      tenantId: id,
      userId: userId,
    }).then((x) => x)
      .catch((x) => null);

    if (!result) {
      return ResponseNotFound('Tenant user entry not found');
    }

    if (!result.enabled) {
      return ResponseForbidden('Tenant user entry already disabled');
    }

    const payload: any = {
      enabled: false,
    };

    return await this.tenantUserDao.updateById(result.id, payload)
      .then((x) => {
        this.logger.log(`[removeUserFromTenant] Removed userId ${userId} from tenant ${id}`, x);
        return ResponseNoContent();
      }).catch((x) => {
        this.logger.error(`[removeUserFromTenant] Removal of user ${userId} from tenant ${id} failed`, x);
        return ResponseForbidden('Unable to remove user from tenant user entry');
      });
  }

}