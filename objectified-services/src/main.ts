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
    .addTag('classes', '`Class`es are templates that define the _shape_ (or _schema_) of data that \n' +
      'can be contained in a record (or instance).  For more information on best \n' +
      'practices on creating and updating classes, please \n' +
      '[refer to this documentation](https://soon-to-be-created.com)\n' +
      'for more detailed information.')
    .addTag('data-types', '`DataType`s describe the types of data that can be stored in fields.\n\n' +
      '`DataType`s can contain arrays of data, enumerations, regular expressions, and\n' +
      'much more.\n\n' +
      'Reserved `DataType`s cannot be modified or removed, as they are considered \n' +
      'core to the Objectified platform.  Normal `DataType`s are specific to their\n' +
      '`Namespace`.  Core `DataType`s are available system-wide, so use with care.\n\n' +
      'The most common usage for `DataType`s outside of the core `DataType`s is in\n' +
      'defining custom enumeration values.  Other `DataType`s like custom filters and\n' +
      'regular expressions can be created, but these occasions are generally rare.\n\n' +
      'Please [refer to this documentation](https://soon-to-be-created.com)\n' +
      'for more detailed on best practices regarding `DataType` and `Field` definitions.')
    .addTag('fields', '`Field`s are assignments of logical names to a `DataType` definition.\n\n' +
      'In Object Oriented design, fields define the data that can be stored for a\n' +
      'class property.  Property names are unique per `Class`, but the `Field`s that\n' +
      'contain the storage definitions can be reused as necessary.\n\n' +
      '`Field`s are not indexed because they do not define the names of values that \n' +
      'store the data.  `Properties` can be indexed, because they are unique to each\n' +
      '`Class` and may be common between other `Class`es of similar structure.\n\n' +
      'Please\n' +
      '[refer to this documentation](https://soon-to-be-created.com)\n' +
      'for more detailed on best practices regarding `DataType` and `Field` definitions.')
    .addTag('generator', '`Generator` is used to generate JSON schema definitions and code snippets for\n' +
      'different schemas that have been created and well-defined in Objectified.')
    .addTag('groups', 'Manages `Group` membership that groups users into common logical groups.\n\n' +
      '`Group`s are also referred to as tenancy identifiers.  Users can be members of multiple\n' +
      '`Group`s, but cannot join the same `Group` twice.')
    .addTag('instances', '`Instances` are records created using `Class` definitions as templates.\n\n' +
      'Instance data contains data associated with an `Instance`, organized by\n' +
      'version number and record date.')
    .addTag('links', '`Link`s describe data between `Class`es that have a commonality or logical\n' +
      'relationship.\n\n' +
      'For instance, a `Car` might link a `Dealership` together, or an `Owner`.\n' +
      '`House`s may have `Mortgage`s, and so on.  `Link`s contain a left side (t1)\n' +
      'and a right side (t2), and link two `Class`es together.\n\n' +
      '`Link`s may contain links to themselves (ie. a parent/child relationship.)')
    .addTag('namespaces', '`Namespace`s are names that are used to organize groups of objects.  They are used \n' +
      'to prevent name collisions that can occur when multiple organizations may \n' +
      'use similar names to describe different object definitions.\n\n' +
      'A `Namespace` ensures that all of a given set of objects have unique names so \n' +
      'that they may easily be identified and separated under a common group.\n\n' +
      'For instance, one `Namespace`\'s definition of a `User` may differ from another \n' +
      '`Namespace`\'s `User`. Same with a `Car`, `Bike`, or `Computer`.\n\n' +
      'A reserved `Namespace` is a core `Namespace` that is used by Objectified\n' +
      'internally.  These `Namespaces` cannot be altered, but they can be referred to \n' +
      'in other `Namespace`s, should you choose to import them directly into your\n' +
      '`Namespace`.')
    .addTag('properties', '`Properties` are member stores that are used by `Class`es to store data \n' +
      'defined by a `Field`.\n\n' +
      '`Properties` extend `Fields` by adding options such as nullability,\n' +
      'default values, required flags, indexing, and so on.  `Properties` can also be\n' +
      'objects that implement other `Properties` (sub-properties).')
    .addTag('users', 'Services for `User` accounts.  Allows for creation of `User` accounts, as well as\n' +
      'deactivation, modifications, and retrieval of `User` records.  Only administrators\n' +
      'have access to these services, whereas normal users can change their own account\n' +
      'records.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(SERVER_PORT);
})();
