import { LinkDto } from '../generated/dto';
import { BaseDao } from './BaseDao';

export class LinkDao extends BaseDao<LinkDto> {
  constructor() {
    super('obj.link');
  }
}