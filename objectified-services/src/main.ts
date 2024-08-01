import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const SERVER_PORT: number = 3001;
const SWAGGER_PATH: string = '/v1/api';

(async () => {
  const logger = new Logger('main');
  logger.log('Bootstrap');

  const app = await NestFactory.create(AppModule);

  await app.listen(SERVER_PORT);
})();
