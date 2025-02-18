import { Module } from '@nestjs/common';
import {ClassController} from "./generated/controllers";
import {ClassServiceImpl} from "./services";

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassServiceImpl],
})
export class AppModule {}
