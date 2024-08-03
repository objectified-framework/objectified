import * as pgPromise from 'pg-promise';
import {ClassDto} from "../generated/dto";

export class ClassDao {
  constructor(private pg: pgPromise.IDatabase<any>) {}

  async getById(id: bigint): Promise<ClassDto> {
    return null;
  }

  async getByName(name: string, namespaceId: bigint): Promise<ClassDto> {
    return null;
  }

  async getByNamespace(namespaceId: bigint): Promise<ClassDto[]> {
    return [];
  }

  async create(obj: ClassDto): Promise<ClassDto> {
    return null;
  }

  async delete(id: bigint): Promise<ClassDto> {
    return null;
  }

  // CREATE TABLE obj.class (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     owner_id INT NOT NULL REFERENCES obj.user(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096) NOT NULL,
  //     status obj.class_status_enum NOT NULL DEFAULT 'enabled',
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     update_date TIMESTAMP WITHOUT TIME ZONE,
  //     disable_date TIMESTAMP WITHOUT TIME ZONE
  // );
}
