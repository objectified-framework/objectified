import {Injectable, Logger} from '@nestjs/common';
import {PropertiesService} from "../generated/services";
import {IdArrayInputDto, PropertyDto} from "../generated/dto";

@Injectable()
export class PropertiesServiceImpl implements PropertiesService {
  private readonly logger = new Logger('PropertiesServiceImpl');

  /**
   * Creates a new property.
   */
  createProperty(propertyDto: PropertyDto): void {}

  /**
   * Returns a `Property` by its ID.
   */
  getPropertyById(propertyId: number): PropertyDto {
    return null;
  }

  /**
   * Applies changes to a `Property`, only changing the values supplied in the request body.
   */
  editProperty(propertyId: number, propertyDto: PropertyDto): void {}

  /**
   * Deletes a `Property` by ID
   */
  deleteProperty(propertyId: number): void {}

  /**
   * Returns `Properties` by its `Property` Object ID.
   */
  getPropertyByObjectId(propertyId: number): PropertyDto {
    return null;
  }

  /**
   * Adds `Properties` to an object by its `Property` ID.
   */
  addObjectToProperty(propertyId: number, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `Properties` from an object `Property` by the `Property` IDs.
   */
  deletePropertiesFromObject(propertyId: number, idArrayInputDto: IdArrayInputDto): void {}
}
