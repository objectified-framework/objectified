import {BaseDao} from "./BaseDao";
import {InstanceDto} from "../generated/dto";

export class InstanceDao extends BaseDao<InstanceDto> {
  constructor() {
    super("obj.instance");
  }
}