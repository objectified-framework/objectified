import { InstancesService } from '@objectified/objectified-api/dist/generated/services';
import { InstanceDto, InstanceDataDto } from '@objectified/objectified-api/dist/generated/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstancesServiceImpl implements InstancesService {
  /**
   * Creates a new Instance.
   */
  createInstance(instanceDto: InstanceDto): void {}

  /**
   * Returns the instance record based on its instance ID.
   */
  getInstanceById(instanceId: number): InstanceDataDto {
    return null;
  }

  /**
   * Deletes an `Instance`.
   */
  deleteInstance(instanceId: number): void {}

  /**
   * Edits an `Instance`.
   */
  editInstance(instanceId: number): InstanceDto {
    return null;
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
   */
  createInstanceData(instanceId: number, instanceDataDto: InstanceDataDto): void {}

  /**
   * Returns the latest `InstanceData` record for the `Instance`.
   */
  getInstanceData(instanceId: number): InstanceDataDto {
    return null;
  }

  /**
   * Deletes an `InstanceData` record.
   */
  deleteInstanceData(instanceId: number): void {}
}
