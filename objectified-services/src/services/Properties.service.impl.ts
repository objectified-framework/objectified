import {PropertiesService, ServiceResponse} from "../generated/services";
import {IdArrayInputDto, PropertyDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";

export class PropertiesServiceImpl implements PropertiesService {

  /**
   * Creates a new property.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param propertyDto The property object to create.
   */
  async createProperty(propertyDto: PropertyDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns a `Property` by its ID.
   *
   * - Response code '200': 'An array of properties.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the property.
   */
  async getPropertyById(propertyId: number): Promise<ServiceResponse<PropertyDto>> {
    return {
      returnValue: <PropertyDto>JSONSchemaFaker.generate(PropertyDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Applies changes to a `Property`, only changing the values supplied in the request body.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the property.
   * @param propertyDto The `Property` changes to apply.
   */
  async editProperty(propertyId: number, propertyDto: PropertyDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Deletes a `Property` by ID
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the `Property` to remove.
   */
  async deleteProperty(propertyId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Returns `Properties` by its `Property` Object ID.
   *
   * - Response code '200': 'An array of `Properties`.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the object `Property`.
   */
  async getPropertyByObjectId(propertyId: number): Promise<ServiceResponse<PropertyDto>> {
    return {
      returnValue: <PropertyDto>JSONSchemaFaker.generate(PropertyDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Adds `Properties` to an object by its `Property` ID.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the object `Property`.
   * @param idArrayInputDto The `Property` IDs.
   */
  async addObjectToProperty(propertyId: number, idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `Properties` from an object `Property` by the `Property` IDs.
   *
   * - Response code '204': 'Removed successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Property not found'
   *
   * @param propertyId The ID of the object `Property`.
   * @param idArrayInputDto The `Property` IDs.
   */
  async deletePropertiesFromObject(propertyId: number, idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}