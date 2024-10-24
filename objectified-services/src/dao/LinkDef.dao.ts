import {LinkDefDto} from "../generated/dto";
import { DaoClass } from "./DaoClass";

export class LinkDefDao extends DaoClass<LinkDefDto> {
  constructor() {
    super('obj.link_def');
  }
}