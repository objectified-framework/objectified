import { UserDto } from '../generated/dto';
import { BaseDao } from './BaseDao';

export class UserDao extends BaseDao<UserDto> {
  constructor() {
    super('obj.user');
  }
}
