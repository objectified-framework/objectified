import { Logger } from '@nestjs/common';
import {
  DataTypeService, ResponseForbidden, ResponseNoContent,
  ResponseNotFound,
  ResponseOk,
  ResponseUnauthorized,
  ServiceResponse
} from "../generated/services";
import {DataTypeDto} from "../generated/dto";
import {DataTypeDao} from "../generated/dao";

export class DataTypeServiceImpl implements DataTypeService {
  private readonly logger = new Logger(DataTypeServiceImpl.name);
  private readonly dao = new DataTypeDao();

  async createDataType(request, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    const insertObject = dataTypeDto;

    insertObject.updateDate = null;
    insertObject.deleteDate = null;

    if (insertObject.coreType) {
      this.logger.error(`[createDataType] Attempted to create data type '${insertObject.name}' as a core type; not permitted.`);
      return ResponseForbidden('Unable to create a data type.');
    }

    if (!insertObject.ownerId) {
      this.logger.error(`[createDataType] Attempted to create data type '${insertObject.name}' without an owner ID`);
      return ResponseForbidden('Unable to create data type.');
    }

    const result = await this.dao.create(insertObject)
      .then((x) => {
        this.logger.log(`[createDataType] Created new data type: name=${insertObject.name} owner=${insertObject.ownerId}`);
        return x;
      })
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

  async listDataTypes(request): Promise<ServiceResponse<DataTypeDto[]>> {
    const results = (await this.dao.getAll()) ?? [];

    this.logger.log(`[listDataTypes] List retrieved (size=${results ? results.length : 0})`);

    return ResponseOk(results);
  }

  async updateDataType(request, id: string, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[updateDataType] id=${id} dataTypeDto=${JSON.stringify(dataTypeDto, null, 2)}`);

    const replacePayload: any = {
      name: dataTypeDto.name,
      description: dataTypeDto.description,
      dataType: dataTypeDto.dataType,
      isArray: dataTypeDto.isArray,
      maxLength: dataTypeDto.maxLength,
      pattern: dataTypeDto.pattern,
      enumValues: dataTypeDto.enumValues,
      enumDescriptions: dataTypeDto.enumDescriptions,
      examples: dataTypeDto.examples,
      updateDate: new Date(),
    }

    const result = await this.dao.updateById(id, replacePayload)
      .then((x) => {
        console.log('[updateDataType] Update', x);
        return x;
      })
      .catch((x) => {
        console.log('[updateDataType] Update fail', x);
        return null;
      })

    if (!result) {
      return ResponseForbidden('Unable to update data type.');
    }

    return ResponseOk(result);
  }

  async disableDataType(request, id: string): Promise<ServiceResponse<null>> {
    this.logger.log(`[disableDataType] Disable data_type by ID=${id}`);

    const result = await this.dao.getById(id)
      .then((x) => {
        this.logger.log(`[disableDataType] Object retrieved by ID=${id}`);
        return x;
      })
      .catch((x) => {
        this.logger.error('[disableDataType] Object failed to retrieve', x);
        return null;
      });

    if (!result) {
      return ResponseNotFound(id);
    }

    if (result.coreType) {
      return ResponseForbidden('Cannot disable a core data type');
    }

    result.enabled = false;
    result.deleteDate = new Date();

    return await this.dao.updateById(id, result)
      .then((x) => {
        this.logger.log(`[disableDataType] Object disabled ID=${id}`);
        return ResponseNoContent();
      })
      .catch((x) => {
        this.logger.error(`[disableDataType] Unable to disable ID=${id}`, x);
        return ResponseForbidden('Cannot disable this data type');
      });
  }
}