import {GroupDto} from "../generated/dto";
import { BaseDao } from "./BaseDao";

export class GroupDao extends BaseDao<GroupDto> {
  constructor() {
    super('obj.group');
  }
}