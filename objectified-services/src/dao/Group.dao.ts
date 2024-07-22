import { GroupDto, UserDto } from '@objectified/objectified-api/dist/generated/dto';

export class GroupDao {
  constructor(private pg: any) { }

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