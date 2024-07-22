import { DataTypeDto } from '@objectified/objectified-api/dist/generated/dto';
import * as pgPromise from "pg-promise";

export class DataTypeDao {
  constructor(private pg: pgPromise.IDatabase<any>) { }

  async getById(id: bigint): Promise<DataTypeDto> {
    return null;
  }

  async getByName(name: string, namespaceId: bigint): Promise<DataTypeDto> {
    return null;
  }

  async getByNamespace(namespaceId: bigint): Promise<DataTypeDto[]> {
    return [];
  }

  async create(obj: DataTypeDto): Promise<DataTypeDto> {
    return null;
  }

  async delete(id: bigint): Promise<DataTypeDto> {
    return null;
  }

  //CREATE TABLE obj.data_type (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     data_type obj.data_type_data_type NOT NULL,
  //     is_array BOOLEAN NOT NULL DEFAULT false,
  //     max_length INT NOT NULL DEFAULT 0,
  //     pattern VARCHAR(255),
  //     enum_values VARCHAR(40)[],
  //     enum_descriptions VARCHAR(255)[],
  //     examples VARCHAR(4096)[],
  //     status obj.data_type_status NOT NULL DEFAULT 'enabled',
  //     reserved BOOLEAN NOT NULL DEFAULT false,
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     update_date TIMESTAMP WITHOUT TIME ZONE
  // );
}