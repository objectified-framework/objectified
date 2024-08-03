import { Injectable } from '@nestjs/common';
import {DataTypesService} from "../generated/services";
import {DataTypeDto} from "../generated/dto";

@Injectable()
export class DataTypesServiceImpl implements DataTypesService {
  /**
   * Creates a new data type.
   */
  createDataType(dataTypeDto: DataTypeDto): void {}

  /**
   * Returns the data type by its ID.
   */
  getDataTypeById(dataTypeId: number): DataTypeDto {
    return null;
  }

  /**
   * Disables a data type.
   */
  disableDataType(dataTypeId: number): void {}

  /**
   * Edits a `DataType`.
   */
  editDataType(dataTypeId: number): DataTypeDto {
    return null;
  }
}
