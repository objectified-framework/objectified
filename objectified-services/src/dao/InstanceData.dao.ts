import { InstanceDataDto } from '@objectified/objectified-api/dist/generated/dto';

export class InstanceDataDao {
  constructor(private pg: any) { }

  async getById(id: bigint): Promise<InstanceDataDto> {
    return null;
  }

  async getLatest(instanceId: bigint): Promise<InstanceDataDto> {
    return null;
  }

  async getInstanceForVersion(instanceId: bigint, version: bigint): Promise<InstanceDataDto> {
    return null;
  }

  async getAllInstances(instanceId: bigint): Promise<InstanceDataDto[]> {
    return [];
  }

  async create(obj: InstanceDataDto): Promise<InstanceDataDto> {
    return null;
  }

  async delete(id: bigint): Promise<InstanceDataDto> {
    return null;
  }

  // CREATE TABLE obj.instance_data (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     instance_id INT NOT NULL REFERENCES obj.instance(id),
  //     data JSONB,
  //     version INT NOT NULL DEFAULT 1,
  //     date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
  // );
}