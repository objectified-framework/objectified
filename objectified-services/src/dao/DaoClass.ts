import { DaoUtils } from "./dao-utils";

export class DaoClass<T> {
  constructor(private readonly tableName: string) { }

  public async getAll(): Promise<void | T[]> {
    const db = DaoUtils.getDatabase();
    const sql = "SELECT * FROM " + this.tableName;

    return db.any(sql)
      .then((data) => {
        return data.forEach((x) => DaoUtils.normalize(x));
      });
  }

  public async getById(id: number): Promise<void | T> {
    const db = DaoUtils.getDatabase();
    const sql = "SELECT * FROM " + this.tableName + " WHERE id=$1";

    return db.oneOrNone(sql)
      .then((data) => DaoUtils.normalize(data));
  }

  public async create(data: T): Promise<void | T> {
    const db = DaoUtils.getDatabase();
    const sql = DaoUtils.generateInsertSql(this.tableName, data);

    return db.one(sql, data)
      .then((data) => DaoUtils.normalize(data));
  }

  public async deleteById(id: number): Promise<void> {
    const db = DaoUtils.getDatabase();
    const sql = "DELETE FROM " + this.tableName + " WHERE id=$1";

    return db.none(sql, id);
  }
}