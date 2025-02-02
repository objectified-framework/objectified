import {
  AuthController,
  ClassController,
  ClassPropertyController,
  DataTypeController,
  FieldController,
  PropertyController,
  TenantController,
  UserController
} from './generated/controllers';
import {
  AuthServiceImpl,
  ClassServiceImpl,
  ClassPropertyServiceImpl,
  DataTypeServiceImpl,
  FieldServiceImpl,
  PropertyServiceImpl,
  TenantServiceImpl,
  UserServiceImpl
} from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AuthController,
    ClassController,
    ClassPropertyController,
    DataTypeController,
    FieldController,
    PropertyController,
    TenantController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    ClassServiceImpl,
    ClassPropertyServiceImpl,
    DataTypeServiceImpl,
    FieldServiceImpl,
    PropertyServiceImpl,
    TenantServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
