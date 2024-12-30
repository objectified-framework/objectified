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
    .addTag('auth', 'Authentication services that are used in conjunction with third party authenticators.  These\n' +
      'services provide access to user accounts based on their email addresses.  Any additional\n' +
      'information provided by the third party authenticators are stored in the users\' associated\n' +
      'accounts, or in session variables as necessary.  Remaining information such as a user\'s\n' +
      'name, or account settings are stored in Objectified through other services.')
    .addTag('user', 'User services are applied after a user login is complete.  Once a user has been successfully\n' +
      'authenticated using auth, the user data store can be modified or retrieved.')
    .addTag('data-type', 'Data Type service is used for CRUD operations associated with data types.')
    .addTag('tenant', 'Tenant services are used for CRUD services on Tenants, along with tenancy\n' +
      'assignment.')
    .addTag('field', 'Field services assign data types to reusable storage objects.  Fields are used\n' +
      'by properties to define the data they contain, represented by properties in\n' +
      'classes.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(SERVER_PORT);
})();
