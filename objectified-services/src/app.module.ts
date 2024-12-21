import { AuthController } from './generated/controllers';
import { AuthServiceImpl } from './services';
import { Module } from '@nestjs/common';

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
