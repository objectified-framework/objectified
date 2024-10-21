/**
 * Database Utilities class
 */

import * as pgPromise from 'pg-promise';
import {toCamelCase} from '@objectified/objectified-api/dist/util';

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
}
