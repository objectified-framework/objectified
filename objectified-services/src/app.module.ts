import {AuthController, UserController} from './generated/controllers';
import {AuthServiceImpl, UserServiceImpl} from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    AuthController,
    UserController,
  ],
  providers: [
    AuthServiceImpl,
    UserServiceImpl,
  ],
})
export class AppModule {}
