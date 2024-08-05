import {InstancesService, ServiceResponse} from "../generated/services";
import {FieldDto, GroupDto, InstanceDataDto, InstanceDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";
import { Request } from 'express';

export class InstancesServiceImpl implements InstancesService {

  /**
   * Creates a new Instance.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param instanceDto The `Instance` to create.
   */
  async createInstance(request: Request, instanceDto: InstanceDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns the instance record based on its instance ID.
   *
   * - Response code '200': 'An instance.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the instance.
   */
  async getInstanceById(request: Request, instanceId: number): Promise<ServiceResponse<InstanceDataDto>> {
    return {
      returnValue: <InstanceDataDto>JSONSchemaFaker.generate(InstanceDataDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Deletes an `Instance`.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the `Instance`.
   */
  async deleteInstance(request: Request, instanceId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Edits an `Instance`.
   *
   * - Response code '200': 'OK, returns the `Instance` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the `Instance`.
   */
  async editInstance(request: Request, instanceId: number): Promise<ServiceResponse<InstanceDto>> {
    return {
      returnValue: <InstanceDto>JSONSchemaFaker.generate(InstanceDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Creates a new `InstanceData` record.  If an `InstanceData` record already exists for the `Instance`,
   * a new `InstanceData` record is created, and the version is incremented.
   *
   * __NOTE:__ Adding a new data record to an `Instance` that has been deleted will append the record,
   * but will not affect the deletion flag.
   *
   * Records that are added to an `Instance` are validated using JSON Schema Validation.  Any validations
   * that fail will return an bad request error (400), and the record will not be created.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the `Instance`.
   * @param instanceDataDto The instance data object to create.
   */
  async createInstanceData(request: Request, instanceId: number, instanceDataDto: InstanceDataDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns the latest `InstanceData` record for the `Instance`.
   *
   * - Response code '200': 'The latest `InstanceData` record.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the `Instance`.
   */
  async getInstanceData(request: Request, instanceId: number): Promise<ServiceResponse<InstanceDataDto>> {
    return {
      returnValue: <InstanceDataDto>JSONSchemaFaker.generate(InstanceDataDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Deletes an `InstanceData` record.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Instance not found'
   *
   * @param instanceId The ID of the `Instance`.
   */
  async deleteInstanceData(request: Request, instanceId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}