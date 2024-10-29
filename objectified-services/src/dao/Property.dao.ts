import {BaseDao} from "./BaseDao";
import {PropertyDto} from "../generated/dto";

export class PropertyDao extends BaseDao<PropertyDto> {
  constructor() {
    super('obj.property');
  }
}