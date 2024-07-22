import { LinkDefDto } from '@objectified/objectified-api/dist/generated/dto';

export class LinkDefDao {
  constructor(private pg: any) { }

  async getById(id: bigint): Promise<LinkDefDto> {
    return null;
  }

  async getByName(name: string, namespaceId: bigint): Promise<LinkDefDto> {
    return null;
  }

  async getByNamespace(namespaceId: bigint): Promise<LinkDefDto[]> {
    return [];
  }

  async create(obj: LinkDefDto): Promise<LinkDefDto> {
    return null;
  }

  async delete(id: bigint): Promise<LinkDefDto> {
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