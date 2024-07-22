import { FieldDto } from '@objectified/objectified-api/dist/generated/dto';
import * as pgPromise from "pg-promise";

export class FieldDao {
  constructor(private pg: pgPromise.IDatabase<any>) { }

  async getById(id: bigint): Promise<FieldDto> {
    return null;
  }

  async getByName(name: string, dataTypeId: bigint, namespaceId: bigint): Promise<FieldDto> {
    return null;
  }

  async getByNamespace(namespaceId: bigint): Promise<FieldDto[]> {
    return [];
  }

  async create(obj: FieldDto): Promise<FieldDto> {
    return null;
  }

  async delete(id: bigint): Promise<FieldDto> {
    return null;
  }

  // CREATE TABLE obj.field (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     data_type_id INT NOT NULL REFERENCES obj.data_type(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     default_value VARCHAR(4096) DEFAULT NULL,
  //     status obj.field_status NOT NULL DEFAULT 'enabled',
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     update_date TIMESTAMP WITHOUT TIME ZONE,
  //     disable_date TIMESTAMP WITHOUT TIME ZONE
  // );
}