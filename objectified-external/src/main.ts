import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

const SERVER_PORT: number = process.env['BIND_PORT'] ? parseInt(process.env['BIND_PORT']) : 3001;
const SERVER_ADDRESS: string = process.env['BIND_ADDRESS'] ?? '0.0.0.0';
const SWAGGER_PATH: string = '/swagger';

(async () => {
  const logger = new Logger('main');
  logger.log(`Bootstrap: Port ${SERVER_ADDRESS}:${SERVER_PORT}`);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Objectified API')
    .setVersion('0.1.8')
    .setDescription('Objectified is a **time-series object database that supports dynamic schemas**.\n' +
      '\n' +
      'This API specification defines REST services for Objectified.  Requests made to\n' +
      'this server can only be made using the `application/json` content type.\n' +
      '\n' +
      'You must have a valid API_KEY to request data from this server.')
    .addTag('class', 'Classes are templates that define the shape (or schema) of data that can be contained in ' +
      'a record (or Instance).')
    .addCookieAuth('API_KEY')
    .build();

  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(SERVER_PORT, SERVER_ADDRESS);
})();
