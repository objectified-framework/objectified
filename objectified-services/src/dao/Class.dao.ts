import { ClassDto } from '@objectified/objectified-api/dist/generated/dto';

export class ClassDao {
  constructor(private pg: any) {}

  async getById(id: bigint): Promise<ClassDto> {
    return null;
  }

  //CREATE TABLE obj.class (
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