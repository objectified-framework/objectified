import {DataTypeDto} from "../generated/dto";
import {BaseDao} from "./BaseDao";

export class DataTypeDao extends BaseDao<DataTypeDto> {
  constructor() {
    super('obj.data_type');
  }
}