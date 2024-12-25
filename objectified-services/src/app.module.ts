import {AuthController, DataTypeController, UserController} from './generated/controllers';
import {AuthServiceImpl, DataTypeServiceImpl, UserServiceImpl} from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AuthController,
    DataTypeController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    DataTypeServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
