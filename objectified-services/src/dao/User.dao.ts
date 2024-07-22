import { UserDto } from '@objectified/objectified-api/dist/generated/dto';
import * as pgPromise from "pg-promise";

export class UserDao {
  constructor(private pg: pgPromise.IDatabase<any>) { }

  async getById(id: bigint): Promise<UserDto> {
    return null;
  }

  async getByUsername(username: string): Promise<UserDto> {
    return null;
  }

  async getByUsernameAndPassword(username: string, password: string): Promise<UserDto> {
    return null;
  }

  async create(obj: UserDto): Promise<UserDto> {
    return null;
  }

  async delete(id: bigint): Promise<UserDto> {
    return null;
  }

//CREATE TABLE obj.user (
//     id SERIAL NOT NULL PRIMARY KEY,
//     username VARCHAR(80) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     email_address VARCHAR(255) NOT NULL,
//     verified BOOLEAN NOT NULL DEFAULT false,
//     status obj.user_status_enum NOT NULL DEFAULT 'enabled',
//     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
//     data JSONB
// );
}