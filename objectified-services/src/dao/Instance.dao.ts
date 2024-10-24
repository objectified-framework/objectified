import {DaoClass} from "./DaoClass";
import {InstanceDto} from "../generated/dto";

export class InstanceDao extends DaoClass<InstanceDto> {
  constructor() {
    super("obj.instance");
  }
}