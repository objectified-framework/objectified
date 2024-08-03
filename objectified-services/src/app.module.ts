import { Module } from '@nestjs/common';
import {
  AuthController,
  ClassesController,
  DataTypesController,
  FieldsController,
  GeneratorController,
  GroupsController,
  InstancesController,
  LinksController,
  NamespacesController,
  PropertiesController,
  UsersController,
} from '../../objectified-api/dist/generated/controllers';
import { ClassesServiceImpl } from './services/Classes.service.impl';
import { DataTypesServiceImpl } from './services/DataTypes.service.impl';
import { AuthServiceImpl } from './services/Auth.service.impl';
import { FieldsServiceImpl } from './services/Fields.service.impl';
import { GeneratorServiceImpl } from './services/Generator.service.impl';
import { GroupsServiceImpl } from './services/Groups.service.impl';
import { InstancesServiceImpl } from './services/Instances.service.impl';
import { LinksServiceImpl } from './services/Links.service.impl';
import { NamespacesServiceImpl } from './services/Namespaces.service.impl';
import { PropertiesServiceImpl } from './services/Properties.service.impl';
import { UsersServiceImpl } from './services/Users.service.impl';

@Module({
  imports: [],
  controllers: [
    AuthController,
    ClassesController,
    DataTypesController,
    FieldsController,
    GeneratorController,
    GroupsController,
    InstancesController,
    LinksController,
    NamespacesController,
    PropertiesController,
    UsersController,
  ],
  providers: [
    AuthServiceImpl,
    ClassesServiceImpl,
    DataTypesServiceImpl,
    FieldsServiceImpl,
    GeneratorServiceImpl,
    GroupsServiceImpl,
    InstancesServiceImpl,
    LinksServiceImpl,
    NamespacesServiceImpl,
    PropertiesServiceImpl,
    UsersServiceImpl,
  ],
})
export class AppModule {}
