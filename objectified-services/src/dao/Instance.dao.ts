import { InstanceDto } from '@objectified/objectified-api/dist/generated/dto';

export class InstanceDao {
  constructor(private pg: any) { }

  async getById(id: bigint): Promise<InstanceDto> {
    return null;
  }

  async getByClassId(classId: bigint, namespaceId: bigint): Promise<InstanceDto[]> {
    return [];
  }

  async getByName(name: string, namespaceId: bigint): Promise<InstanceDto> {
    return null;
  }

  async getInstancesForNamespace(namespaceId: bigint): Promise<InstanceDto[]> {
    return [];
  }

  async getInstancesForClass(classId: bigint): Promise<InstanceDto[]> {
    return [];
  }

  async create(obj: InstanceDto): Promise<InstanceDto> {
    return null;
  }

  async delete(id: bigint): Promise<InstanceDto> {
    return null;
  }

  // CREATE TABLE obj.instance (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     class_id INT NOT NULL REFERENCES obj.class(id),
  //     owner_id INT NOT NULL REFERENCES obj.user(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     status obj.instance_status NOT NULL DEFAULT 'active',
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     update_date TIMESTAMP WITHOUT TIME ZONE,
  //     disable_date TIMESTAMP WITHOUT TIME ZONE
  // );
}