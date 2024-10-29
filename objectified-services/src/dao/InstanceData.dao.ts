import {BaseDao} from "./BaseDao";
import {InstanceDataDto} from "../generated/dto";

export class InstanceDataDao extends BaseDao<InstanceDataDto> {
  constructor() {
    super('obj.instance_data');
  }
}