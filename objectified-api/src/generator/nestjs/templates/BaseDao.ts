import { DaoUtils } from './DaoUtils';

export class BaseDao<T> {
  constructor(private readonly tableName: string) { }

  public async getAll(): Promise<void | T[]> {
    const db = DaoUtils.getDatabase();
    const sql = 'SELECT * FROM ' + this.tableName;

    return (await db.any(sql))
      .map(x => DaoUtils.normalize<T>(x));
  }

  public async getById(id: number): Promise<void | T> {
    const db = DaoUtils.getDatabase();
    const sql = 'SELECT * FROM ' + this.tableName + ' WHERE id=$[id]';

    return db.oneOrNone(sql, { id })
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
    const sql = 'DELETE FROM ' + this.tableName + ' WHERE id=$[id]';

    return db.none(sql, { id });
  }

  public async updateById(id: number, data: T): Promise<void | T> {
    const db = DaoUtils.getDatabase();
    const sql = DaoUtils.generateUpdateSql(this.tableName, data);

    return db.one(sql, {
      ...data,
      id,
    })
      .then((data) => DaoUtils.normalize(data));
  }
}