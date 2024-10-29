import {BaseDao} from "./BaseDao";
import {NamespaceDto} from "../generated/dto";

export class NamespaceDao extends BaseDao<NamespaceDto> {
  constructor() {
    super('obj.namespace');
  }
}