import {
  AuthController, ClassController,
  DataTypeController,
  FieldController,
  PropertyController,
  TenantController,
  UserController
} from './generated/controllers';
import {
  AuthServiceImpl,
  ClassServiceImpl,
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
    DataTypeController,
    FieldController,
    PropertyController,
    TenantController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    ClassServiceImpl,
    DataTypeServiceImpl,
    FieldServiceImpl,
    PropertyServiceImpl,
    TenantServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
