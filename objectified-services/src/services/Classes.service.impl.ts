import { ClassesService } from '@objectified/objectified-api/dist/generated/services';
import { ClassDto, PropertyDto, IdArrayInputDto } from '@objectified/objectified-api/dist/generated/dto';

export class ClassesServiceImpl implements ClassesService {
  /**
   * Creates a new class.
   */
  createClass(classDto: ClassDto): void {

  }

  /**
   * Returns a class definition including the class and its properties.
   */
  getClassById(classId: number): ClassDto {
    return null;
  }

  /**
   * Disables a class.
   */
  disableClass(classId: number): void {

  }

  /**
   * Makes edits to a `Class`.
   */
  editClass(classId: number): ClassDto {
    return null;
  }

  /**
   * Returns a list of all `Properties` registered in the given `Class` ID, regardless of status.
   */
  listPropertiesByClass(classId: number): PropertyDto[] {
    return [];
  }

  /**
   * Adds `Properties` by ID to a `Class` by the `Class` ID.
   */
  addPropertyToClass(classId: number, idArrayInputDto: IdArrayInputDto): void {

  }

  /**
   * Removes `Properties` by ID to a `Class` membership by the `Class` ID.
   */
  deletePropertiesFromClass(classId: bigint, idArrayInputDto: IdArrayInputDto): void {

  }

}