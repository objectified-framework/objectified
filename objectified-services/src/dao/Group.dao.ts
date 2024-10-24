import {GroupDto} from "../generated/dto";
import { DaoClass } from "./DaoClass";

export class GroupDao extends DaoClass<GroupDto> {
  constructor() {
    super('obj.group');
  }
}