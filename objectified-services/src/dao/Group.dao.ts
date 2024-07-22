import { GroupDto, UserDto } from '@objectified/objectified-api/dist/generated/dto';
import * as pgPromise from "pg-promise";

export class GroupDao {
  constructor(private pg: pgPromise.IDatabase<any>) { }

  async getById(id: bigint): Promise<GroupDto> {
    return null;
  }

  async getByName(name: string): Promise<GroupDto> {
    return null;
  }

  async getGroupsForUser(userId: bigint): Promise<GroupDto[]> {
    return [];
  }

  async getUsersForGroup(groupId: bigint): Promise<UserDto[]> {
    return [];
  }

  async addUserToGroup(userId: bigint, groupId: bigint): Promise<boolean> {
    return false;
  }

  async create(obj: UserDto): Promise<UserDto> {
    return null;
  }

  async delete(id: bigint): Promise<UserDto> {
    return null;
  }

  //   CREATE TABLE obj.group (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //   name VARCHAR(80) NOT NULL,
  //   description VARCHAR(4096) NOT NULL,
  //   create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
  // );
  //
  // CREATE TABLE obj.group_user (
  //     group_id INT NOT NULL REFERENCES obj.group(id),
  //     user_id INT NOT NULL REFERENCES obj.user(id)
  // );
}