import {FieldService, ServiceResponse} from '../generated/services';
import {FieldDto} from '../generated/dto';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import {FieldDao} from '../generated/dao';

export class FieldServiceImpl implements FieldService {
  private readonly logger = new Logger(FieldServiceImpl.name);
  private readonly dao = new FieldDao();

  createField(request: Request, fieldDto: FieldDto): Promise<ServiceResponse<FieldDto>> {
    return Promise.resolve(undefined);
  }

  disableFieldById(request: Request, id: string): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  editFieldById(request: Request, id: string, fieldDto: FieldDto): Promise<ServiceResponse<null>> {
    return Promise.resolve(undefined);
  }

  getFieldById(request: Request, id: string): Promise<ServiceResponse<FieldDto>> {
    return Promise.resolve(undefined);
  }

  listFields(request: Request): Promise<ServiceResponse<FieldDto[]>> {
    return Promise.resolve(undefined);
  }

}