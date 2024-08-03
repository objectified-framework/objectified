import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const SERVER_PORT: number = 3001;
const SWAGGER_PATH: string = '/v1/api';

(async () => {
  const logger = new Logger('main');
  logger.log(`Bootstrap: Port ${SERVER_PORT}`);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Objectified API')
    .setVersion('0.1.1')
    .addTag('auth', 'Authentication services for login, logout, and refresh.  It does not require use of\n' +
      '`JWT`, as that token will be provided and generated after login success.  The token\n' +
      'returned in the login request is a **JWT token**.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(SERVER_PORT);
})();
