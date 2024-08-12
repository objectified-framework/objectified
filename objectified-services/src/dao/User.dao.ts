import * as pgPromise from 'pg-promise';
import {ClassDto, UserDto} from "../generated/dto";
import {DaoUtils} from "./dao-utils";

export class UserDao {

  private readonly section = 'obj.user';

  constructor(private db: pgPromise.IDatabase<any>) {}

  async getById(id: bigint): Promise<UserDto> {
    return null;
  }

  async getByEmail(email: string): Promise<UserDto> {
    const sql = 'SELECT * FROM obj.user WHERE email_address = $1';

    return this.db.oneOrNone<UserDto>(sql, [email])
      .then((x) => DaoUtils.normalize<UserDto>(x));
  }

  async getByUsername(username: string): Promise<UserDto> {
    const sql = 'SELECT * FROM obj.user WHERE username = $1';

    return this.db.oneOrNone<UserDto>(sql, [username])
      .then((x) => DaoUtils.normalize<UserDto>(x));
  }

  async getByUsernameAndPassword(username: string, password: string): Promise<UserDto> {
    return null;
  }

  async create(obj: UserDto): Promise<UserDto> {
    const createStatement = `INSERT INTO ${this.section} (username, password, email_address, verified, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    return this.db.oneOrNone<UserDto>(createStatement, [obj.username, obj.password, obj.emailAddress, false, 'enabled'])
      .then((x) => DaoUtils.normalize<UserDto>(x));
  }

  async delete(id: bigint): Promise<UserDto> {
    return null;
  }

  //CREATE TABLE obj.user (
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     username VARCHAR(80) NOT NULL UNIQUE,
  //     password VARCHAR(255) NOT NULL,
  //     email_address VARCHAR(255) NOT NULL,
  //     verified BOOLEAN NOT NULL DEFAULT false,
  //     status obj.user_status_enum NOT NULL DEFAULT 'enabled',
  //     create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  //     data JSONB
  // );
}
