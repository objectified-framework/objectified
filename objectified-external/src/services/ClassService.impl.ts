import {ClassService, ResponseOk, ServiceResponse} from "../generated/services";
import {ClassDto} from "../generated/dto";
import {ClassDao, DaoUtils} from "../generated/dao";
import { Request } from 'express';
import { Logger } from '@nestjs/common';

export class ClassServiceImpl implements ClassService {
  private readonly logger = new Logger(ClassServiceImpl.name);
  private readonly dao = new ClassDao();
  private readonly db = DaoUtils.getDatabase();

  async getSchemaForClassById(request: Request, id: string): Promise<ServiceResponse<string>> {
    return Promise.resolve(undefined);
  }

  async listClassesByName(request: Request, name: string): Promise<ServiceResponse<ClassDto[]>> {
    const sql = 'SELECT * FROM obj.class WHERE name LIKE $[name]';
    const results = (await this.db.any(sql, {
      name: `%${name}%`,
    })).map((x: any) => DaoUtils.normalize<ClassDto>(x));

    return ResponseOk(results);
  }

}