import {ClassService, ServiceResponse} from "../generated/services";
import {ClassDto} from "../generated/dto";
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {ClassDao, TenantDao} from "../generated/dao";

export class ClassServiceImpl implements ClassService {
  private readonly logger = new Logger(ClassServiceImpl.name);
  private readonly dao = new ClassDao();

  createClass(request: Request, classDto: ClassDto): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  disableClassById(request: Request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  editClassById(request: Request, id: string, classDto: ClassDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  getClassById(request: Request, id: string): Promise<ServiceResponse<ClassDto>> {
    return Promise.resolve(undefined);
  }

  listClasses(request: Request): Promise<ServiceResponse<ClassDto[]>> {
    return Promise.resolve(undefined);
  }

}