import { LinkDto } from '@objectified/objectified-api/dist/generated/dto';
import * as pgPromise from "pg-promise";

export class LinkDao {
  constructor(private pg: pgPromise.IDatabase<any>) { }

  async getById(id: bigint): Promise<LinkDto> {
    return null;
  }

  async getByName(name: string, namespaceId: bigint): Promise<LinkDto> {
    return null;
  }

  async getByNamespaceId(namespaceId: bigint): Promise<LinkDto[]> {
    return [];
  }

  async create(obj: LinkDto): Promise<LinkDto> {
    return null;
  }

  async delete(id: bigint): Promise<LinkDto> {
    return null;
  }

  // CREATE TABLE obj.link_def (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     namespace_id INT NOT NULL REFERENCES obj.namespace(id),
  //     t1 INT NOT NULL REFERENCES obj.class(id),
  //     t2 INT NOT NULL REFERENCES obj.class(id),
  //     name VARCHAR(80) NOT NULL,
  //     description VARCHAR(4096)
  // );
}