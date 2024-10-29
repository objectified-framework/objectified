import {LinkDefDto} from "../generated/dto";
import { BaseDao } from "./BaseDao";

export class LinkDefDao extends BaseDao<LinkDefDto> {
  constructor() {
    super('obj.link_def');
  }
}