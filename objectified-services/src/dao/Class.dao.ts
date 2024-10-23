import { DaoClass } from './DaoClass';
import { ClassDto } from '../generated/dto';

export class ClassDao extends DaoClass<ClassDto> {
  constructor() {
    super('obj.class');
  }
}
