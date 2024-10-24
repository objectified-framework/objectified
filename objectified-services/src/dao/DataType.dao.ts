import {DataTypeDto} from "../generated/dto";
import {DaoClass} from "./DaoClass";

export class DataTypeDao extends DaoClass<DataTypeDto> {
  constructor() {
    super('obj.data_type');
  }
}