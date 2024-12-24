import { Logger } from '@nestjs/common';
import {DataTypeService, ServiceResponse} from "../generated/services";
import {DataTypeDto} from "../generated/dto";

export class DataTypeServiceImpl implements DataTypeService {
  private readonly logger = new Logger(DataTypeServiceImpl.name);

  createDataType(request, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[createDataType] dataTypeDto=${JSON.stringify(dataTypeDto, null, 2)}`);
    return Promise.resolve(undefined);
  }

  getDataTypeById(request, id: string): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[getDataTypeById] id=${id}`);
    return Promise.resolve(undefined);
  }

  listDataTypes(request): Promise<ServiceResponse<DataTypeDto[]>> {
    this.logger.log('[listDataTypes]');
    return Promise.resolve(undefined);
  }

  updateDataType(request, id: string, dataTypeDto: DataTypeDto): Promise<ServiceResponse<DataTypeDto>> {
    this.logger.log(`[updateDataType] id=${id} dataTypeDto=${JSON.stringify(dataTypeDto, null, 2)}`);
    return Promise.resolve(undefined);
  }
}