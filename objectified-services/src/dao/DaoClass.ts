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
}