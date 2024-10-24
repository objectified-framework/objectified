import {DaoClass} from "./DaoClass";
import {FieldDto} from "../generated/dto";

export class FieldDao extends DaoClass<FieldDto> {
  constructor() {
    super('obj.field');
  }
}