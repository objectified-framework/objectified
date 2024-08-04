import * as pgPromise from 'pg-promise';
import {ClassDto} from "../generated/dto";
import {DaoUtils} from "./dao-utils";

export class ClassDao {

  private readonly section = 'obj.class';

  constructor(private db: pgPromise.IDatabase<any>) {}

  async getById(id: bigint): Promise<ClassDto> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE id=$1`;

    return this.db.oneOrNone<ClassDto>(selectStatement, [id])
      .then((x) => DaoUtils.normalize<ClassDto>(x));
  }

  async getByName(name: string, namespaceId: bigint): Promise<ClassDto> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE name=$1 AND namespace_id=$2`;

    return this.db.oneOrNone<ClassDto>(selectStatement, [name, namespaceId])
      .then((x) => DaoUtils.normalize<ClassDto>(x));
  }

  async list(namespaceId: bigint): Promise<ClassDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE namespace_id=$1`;

    return (await this.db.any<ClassDto>(selectStatement, [namespaceId]))
      .map((x) => DaoUtils.normalize<ClassDto>(x));
  }

  async getByNamespace(namespaceId: bigint): Promise<ClassDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE namespace_id=$1`;

    return (await this.db.any<ClassDto>(selectStatement, [namespaceId]))
      .map((x) => DaoUtils.normalize<ClassDto>(x));
  }

  async create(obj: ClassDto): Promise<ClassDto> {
    const createStatement = `INSERT INTO ${this.section} (namespace_id, name, description, status) VALUES ($1, $2, $3, $4) RETURNING *`;

    return this.db.oneOrNone<ClassDto>(createStatement, [obj.namespaceId, obj.name, obj.description, obj.status])
      .then((x) => DaoUtils.normalize<ClassDto>(x));
  }

  async delete(id: bigint): Promise<ClassDto> {
    const createStatement = `DELETE FROM ${this.section} WHERE id=$1 RETURNING *`;

    return this.db.oneOrNone<ClassDto>(createStatement, [id])
      .then((x) => DaoUtils.normalize<ClassDto>(x));
  }
}
