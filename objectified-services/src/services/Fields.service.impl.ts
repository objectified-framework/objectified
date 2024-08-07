import {FieldsService, ServiceResponse} from "../generated/services";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";
import {FieldDto} from "../generated/dto";
import { Request } from 'express';

export class FieldsServiceImpl implements FieldsService {

  /**
   * Creates a new `Field`.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param fieldDto The `Field` object to create.
   */
  async createField(request: Request, fieldDto: FieldDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns a `Field` by its `Field` ID.
   *
   * - Response code '200': 'A field record.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Field not found'
   *
   * @param fieldId The ID of the `Field`.
   */
  async getFieldById(request: Request, fieldId: number): Promise<ServiceResponse<FieldDto>> {
    return {
      returnValue: <FieldDto>JSONSchemaFaker.generate(FieldDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Disables a `Field`.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Field not found'
   *
   * @param fieldId The ID of the `Field` to disable.
   */
  async disableField(request: Request, fieldId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Edits a `Field`.
   *
   * - Response code '200': 'OK, returns the `Field` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Field not found'
   *
   * @param fieldId The ID of the `Field`.
   */
  async editField(request: Request, fieldId: number): Promise<ServiceResponse<FieldDto>> {
    return {
      returnValue: <FieldDto>JSONSchemaFaker.generate(FieldDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

}