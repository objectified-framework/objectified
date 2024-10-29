import {BaseDao} from "./BaseDao";
import {FieldDto} from "../generated/dto";

export class FieldDao extends BaseDao<FieldDto> {
  constructor() {
    super('obj.field');
  }
}