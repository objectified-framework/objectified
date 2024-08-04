import {NamespacesService, ServiceResponse} from "../generated/services";
import {ClassDto, DataTypeDto, FieldDto, IdArrayInputDto, NamespaceDto, PropertyDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";

export class NamespacesServiceImpl implements NamespacesService {

  /**
   * Returns a list of all namespaces registered in Objectified, regardless of enabled flag status.
   *
   * - Response code '200': 'An array of namespaces registered in Objectified.'
   * - Response code '401': 'Unauthorized'
   */
  listNamespaces(): ServiceResponse<NamespaceDto[]> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Creates a new namespace.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param namespaceDto The namespace object to create.
   */
  createNamespace(namespaceDto: NamespaceDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Gets a namespace by its serial ID.
   *
   * - Response code '200': 'OK, returns the `Namespace` object.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the namespace to retrieve.
   */
  getNamespaceById(namespaceId: number): ServiceResponse<NamespaceDto> {
    return {
      returnValue: <NamespaceDto>JSONSchemaFaker.generate(NamespaceDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Applies changes to a `Namespace`, only changing the values supplied in the request body.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the namespace to retrieve.
   * @param namespaceDto The namespace changes to apply.
   */
  editNamespace(namespaceId: number, namespaceDto: NamespaceDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Disables a namespace.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the namespace to disable.
   */
  disableNamespace(namespaceId: number): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Adds `Group`s by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `Group` IDs.
   */
  addGroupsToNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Group`s by ID from a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `Group` IDs.
   */
  removeGroupsFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Adds `User`s by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `User` IDs.
   */
  addUsersToNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `User`s by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `User` IDs.
   */
  deleteUsersFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Returns a list of all `Class`es registered in the given `Namespace` ID,
   * regardless of status.
   *
   * - Response code '200': 'An array of `Class`es.'
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   */
  listClassesByNamespace(namespaceId: number): ServiceResponse<ClassDto[]> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Creates a new class.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The `Class`es by ID to add to the `Namespace`.
   */
  addClassesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Class`es by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `Class` IDs.
   */
  deleteClassesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Returns a list of all `DataType`s registered in the given `Namespace` ID, regardless of enabled flag status.
   *
   * - Response code '200': 'An array of `DataType`s.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   */
  listDataTypesForNamespace(namespaceId: number): ServiceResponse<DataTypeDto[]> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Assigns `DataType` definitions to a `Namespace`.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The `DataType`s by ID to add to the `Namespace`.
   */
  addDataTypesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `DataType`s by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `DataType` IDs.
   */
  deleteDataTypesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Returns a list of all `Field`s registered in the given `Namespace` ID,
   * regardless of enabled flag status.
   *
   * - Response code '200': 'An array of fields.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the namespace.
   */
  listFields(namespaceId: number): ServiceResponse<FieldDto[]> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Assigns `Field` definitions to a `Namespace`.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The `Field`s by ID to add to the `Namespace`.
   */
  addFieldsToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Field`s by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `Field` IDs.
   */
  deleteFieldsFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Returns a list of all `Properties` registered in the given `Namespace` ID, regardless of status.
   *
   * - Response code '200': 'An array of `Properties`.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   */
  listPropertiesByNamespace(namespaceId: number): ServiceResponse<PropertyDto[]> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Assigns `Property` definitions to a `Namespace`.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The `Properties` by ID to add to the `Namespace`.
   */
  addPropertiesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Properties` by ID to a `Namespace` membership by the `Namespace` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Namespace not found'
   *
   * @param namespaceId The ID of the `Namespace`.
   * @param idArrayInputDto The parameters containing the `Property` IDs.
   */
  deletePropertiesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): ServiceResponse<null> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}