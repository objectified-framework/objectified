import {DaoClass} from "./DaoClass";
import {PropertyDto} from "../generated/dto";

export class PropertyDao extends DaoClass<PropertyDto> {
  constructor() {
    super('obj.property');
  }
}