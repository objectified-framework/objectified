import {DaoClass} from "./DaoClass";
import {InstanceDataDto} from "../generated/dto";

export class InstanceDataDao extends DaoClass<InstanceDataDto> {
  constructor() {
    super('obj.instance_data');
  }
}