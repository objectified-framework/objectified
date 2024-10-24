import {DaoClass} from "./DaoClass";
import {NamespaceDto} from "../generated/dto";

export class NamespaceDao extends DaoClass<NamespaceDto> {
  constructor() {
    super('obj.namespace');
  }
}