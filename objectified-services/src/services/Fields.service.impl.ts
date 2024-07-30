import { FieldsService } from '@objectified/objectified-api/dist/generated/services';
import { FieldDto } from '@objectified/objectified-api/dist/generated/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FieldsServiceImpl implements FieldsService {
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
