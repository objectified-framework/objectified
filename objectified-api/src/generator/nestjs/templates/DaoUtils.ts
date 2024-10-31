/**
 * Database Utilities class
 */

import * as pgPromise from 'pg-promise';

export class DaoUtils {
  private static readonly pgp = pgPromise({});
  private static readonly db = this.pgp(
    process.env.DATABASE_URL ?? 'postgres://localhost:5432/postgres'
  );

  constructor() { }

  public static getDatabase() {
    return this.db;
  }

  public static normalize<T>(data: any | undefined | null): T {
    const returnObject: any = {};

    if (!data) {
      return data;
    }

    for (const [key, obj] of <[string, any]>Object.entries(data)) {
      const newKey = toCamelCase(key);
      returnObject[newKey] = obj;
    }

    return <T>returnObject;
  }

  public static generateInsertSql(tableName: string, data: any): string {
    const keys = Object.keys(data);
    let sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (`;

    sql += keys.map((x) => '$[' + x + ']').join(', ');
    sql += ') RETURNING *';

    return sql;
  }

  public static generateUpdateSql(tableName: string, data: any): string {
    const keys = Object.keys(data);
    let sql = `UPDATE ${tableName} SET `;

    sql += keys.map((x) => x + '=$[' + x + ']').join(', ');
    sql += ' WHERE id=$[id] RETURNING *';

    return sql;
  }
}

/**
 * Converts a string to camel case.
 *
 * @param str String to convert.
 */
export function toCamelCase(str: string): string {
  const s =
    str &&
    str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');

  return s.slice(0, 1).toLowerCase() + s.slice(1);
}
