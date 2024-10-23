import { UserDto } from '../generated/dto';
import { DaoClass } from './DaoClass';

export class UserDao extends DaoClass<UserDto> {
  constructor() {
    super('obj.user');
  }
}
