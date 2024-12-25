import { Logger } from '@nestjs/common';
import {
  DataTypeService,
  ResponseNotFound,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse
} from "../generated/services";
import {DataTypeDto} from "../generated/dto";
import {DataTypeDao} from "../generated/dao";

export class DataTypeServiceImpl implements DataTypeService {
  private readonly logger = new Logger(DataTypeServiceImpl.name);

  async createDataType(request, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[createDataType] dataTypeDto=${JSON.stringify(dataTypeDto, null, 2)}`);

    const insertObject = dataTypeDto;

    insertObject.id = null;
    insertObject.updateDate = null;
    insertObject.deleteDate = null;

    const dao = new DataTypeDao();
    const result = await dao.create(insertObject)
      .then((x) => x)
      .catch((x) => {
        this.logger.error('[createDataType] Error creating type', x);
        return null;
      });

    if (!result) {
      return ResponseUnauthorized('Unable to create data type record.');
    }

    return ResponseOk(result);
  }

  async getDataTypeById(request, id: string): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[getDataTypeById] id=${id}`);

    const dataTypeDao = new DataTypeDao();
    const result = await dataTypeDao.getById(id)
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

  async listDataTypes(request): Promise<ServiceResponse<DataTypeDto[]>> {
    const dataTypeDao = new DataTypeDao();
    const results = (await dataTypeDao.getAll()) ?? [];

    if (results) {
      for (const mappedResult of results) {
        mappedResult.ownerId = null;
      }
    }

    this.logger.log(`[listDataTypes] List retrieved (size=${results ? results.length : 0})`);

    return ResponseOk(results);
  }

  async updateDataType(request, id: string, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[updateDataType] id=${id} dataTypeDto=${JSON.stringify(dataTypeDto, null, 2)}`);
    return Promise.resolve(undefined);
  }
}