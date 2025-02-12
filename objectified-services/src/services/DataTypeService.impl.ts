import { Logger } from '@nestjs/common';
import {
  DataTypeService,
  ResponseNotFound,
  ResponseOk,
  ServiceResponse
} from '../generated/services';
import { Request } from 'express';
import {DataTypeDto} from '../generated/dto';
import {DataTypeDao} from '../generated/dao';

export class DataTypeServiceImpl implements DataTypeService {
  private readonly logger = new Logger(DataTypeServiceImpl.name);
  private readonly dao = new DataTypeDao();

  async getDataTypeById(request: Request, id: string): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[getDataTypeById] id=${id}`);

    const result = await this.dao.getById(id)
      .then((x) => {
        this.logger.log('[getDataTypeById] Object retrieved', x);
        return x;
      })
      .catch((x) => {
        this.logger.error('[getDataTypeById] Object failed to retrieve', x);
        return null;
      });

    if (!result) {
      return ResponseNotFound(id);
    }

    return ResponseOk(result);
  }

  async listDataTypes(request: Request): Promise<ServiceResponse<DataTypeDto[]>> {
    const results = (await this.dao.getAll()) ?? [];

    this.logger.log(`[listDataTypes] List retrieved (size=${results ? results.length : 0})`);

    return ResponseOk(results);
  }
}