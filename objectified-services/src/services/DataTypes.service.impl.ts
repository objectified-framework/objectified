import {DataTypesService, ServiceResponse} from "../generated/services";
import {DataTypeDto} from "../generated/dto";
import {JSONSchemaFaker} from "json-schema-faker";
import {HttpStatus} from "@nestjs/common";

export class DataTypesServiceImpl implements DataTypesService {

  /**
   * Creates a new data type.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param dataTypeDto The data type object to create.
   */
  createDataType(dataTypeDto: DataTypeDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns the data type by its ID.
   *
   * - Response code '200': 'A `DataType`.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Data type not found'
   *
   * @param dataTypeId The ID of the `DataType`.
   */
  getDataTypeById(dataTypeId: number): ServiceResponse<DataTypeDto> {
    return {
      returnValue: <DataTypeDto>JSONSchemaFaker.generate(DataTypeDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Disables a data type.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Data type not found'
   *
   * @param dataTypeId The ID of the data type to disable.
   */
  disableDataType(dataTypeId: number): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Edits a `DataType`.
   *
   * - Response code '200': 'OK, returns the `DataType` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Data type not found'
   *
   * @param dataTypeId The ID of the `DataType` to edit.
   */
  editDataType(dataTypeId: number): ServiceResponse<DataTypeDto> {
    return {
      returnValue: <DataTypeDto>JSONSchemaFaker.generate(DataTypeDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

}