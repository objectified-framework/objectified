import {Injectable, Logger} from '@nestjs/common';
import {FieldsService} from "../generated/services";
import {FieldDto} from "../generated/dto";

@Injectable()
export class FieldsServiceImpl implements FieldsService {
  private readonly logger = new Logger('FieldsServiceImpl');

  /**
   * Creates a new `Field`.
   */
  createField(fieldDto: FieldDto): void {}

  /**
   * Returns a `Field` by its `Field` ID.
   */
  getFieldById(fieldId: number): FieldDto {
    return null;
  }

  /**
   * Disables a `Field`.
   */
  disableField(fieldId: number): void {}

  /**
   * Edits a `Field`.
   */
  editField(fieldId: number): FieldDto {
    return null;
  }
}
