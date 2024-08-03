import { Module } from '@nestjs/common';
import {AuthController} from "./generated/controllers";
import {AuthServiceImpl} from "./services/Auth.service.impl";

@Module({
  imports: [],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthServiceImpl,
  ],
})
export class AppModule {}
