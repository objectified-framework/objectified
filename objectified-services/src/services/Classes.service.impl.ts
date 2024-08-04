import {ClassesService, ServiceResponse} from "../generated/services";
import {ClassDto, IdArrayInputDto, PropertyDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";

export class ClassesServiceImpl implements ClassesService {

  /**
   * Creates a new class.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param classDto The class object to create.
   */
  createClass(classDto: ClassDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
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
  getClassById(classId: number): ServiceResponse<ClassDto> {
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
  disableClass(classId: number): ServiceResponse<null> {
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
  editClass(classId: number): ServiceResponse<ClassDto> {
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
  listPropertiesByClass(classId: number): ServiceResponse<PropertyDto[]> {
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
  addPropertyToClass(classId: number, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
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
  deletePropertiesFromClass(classId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}