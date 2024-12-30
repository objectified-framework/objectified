import {AuthController, DataTypeController, TenantController, UserController} from './generated/controllers';
import {AuthServiceImpl, DataTypeServiceImpl, TenantServiceImpl, UserServiceImpl} from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AuthController,
    DataTypeController,
    TenantController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    DataTypeServiceImpl,
    TenantServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
