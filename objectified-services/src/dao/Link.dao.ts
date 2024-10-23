import { LinkDto } from '../generated/dto';
import { DaoClass } from './DaoClass';

export class LinkDao extends DaoClass<LinkDto> {
  constructor() {
    super('obj.link');
  }
}