import { BaseDao } from './BaseDao';
import { ClassDto } from '../generated/dto';

export class ClassDao extends BaseDao<ClassDto> {
  constructor() {
    super('obj.class');
  }
}
