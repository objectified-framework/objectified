import {
  AuthController, ClassController,
  DataTypeController,
  FieldController,
  TenantController,
  UserController
} from './generated/controllers';
import {
  AuthServiceImpl,
  ClassServiceImpl,
  DataTypeServiceImpl,
  FieldServiceImpl,
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
    TenantController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    ClassServiceImpl,
    DataTypeServiceImpl,
    FieldServiceImpl,
    TenantServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
