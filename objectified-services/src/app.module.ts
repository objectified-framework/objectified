import { Module } from '@nestjs/common';
import {
  AuthController,
  ClassesController,
  DataTypesController,
  FieldsController,
  GeneratorController,
  GroupsController,
  InstancesController, LinksController, NamespacesController, PropertiesController, UsersController,
} from "./generated/controllers";
import {AuthServiceImpl} from "./services/Auth.service.impl";
import {
  ClassesServiceImpl,
  DataTypesServiceImpl,
  FieldsServiceImpl,
  GeneratorServiceImpl,
  GroupsServiceImpl,
  InstancesServiceImpl,
  LinksServiceImpl,
  NamespacesServiceImpl,
  PropertiesServiceImpl,
  UsersServiceImpl
} from "./services";

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
