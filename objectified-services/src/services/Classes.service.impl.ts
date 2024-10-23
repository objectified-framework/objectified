import {ClassesService, ResponseCreated, ServiceResponse} from "../generated/services";
import {ClassDto, IdArrayInputDto, PropertyDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";
import {DaoUtils} from "../dao/dao-utils";
import {ClassDao} from "../dao";
import {Request} from 'express';

export class ClassesServiceImpl implements ClassesService {

  getClasses(request: Request): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  /**
   * Creates a new class.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param classDto The class object to create.
   */
  async createClass(request: Request, classDto: ClassDto): Promise<ServiceResponse<null>> {
    const dao = new ClassDao();
    const result = await dao.create(classDto);

    return ResponseCreated();
  }

  /**
   * Returns a class definition including the class and its properties.
   *
   * - Response code '200': 'OK'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the class.
   */
  async getClassById(request: Request, classId: number): Promise<ServiceResponse<ClassDto>> {
    return {
      returnValue: <ClassDto>JSONSchemaFaker.generate(ClassDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Disables a class.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the class to disable.
   */
  async disableClass(request: Request, classId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Makes edits to a `Class`.
   *
   * - Response code '200': 'OK, returns the `Class` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the class to enable.
   */
  async editClass(request: Request, classId: number): Promise<ServiceResponse<ClassDto>> {
    return {
      returnValue: <ClassDto>JSONSchemaFaker.generate(ClassDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Returns a list of all `Properties` registered in the given `Class` ID, regardless of status.
   *
   * - Response code '200': 'An array of `Properties`.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the `Class`.
   */
  async listPropertiesByClass(request: Request, classId: number): Promise<ServiceResponse<PropertyDto[]>> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Adds `Properties` by ID to a `Class` by the `Class` ID.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the `Class`.
   * @param idArrayInputDto The parameters containing the property and class IDs.
   */
  async addPropertyToClass(request: Request, classId: number, idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Properties` by ID to a `Class` membership by the `Class` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Class not found'
   *
   * @param classId The ID of the `Class`.
   * @param idArrayInputDto The parameters containing the `Property` IDs.
   */
  async deletePropertiesFromClass(request: Request, classId: bigint, idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}