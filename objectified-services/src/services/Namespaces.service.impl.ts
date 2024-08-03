import { Injectable } from '@nestjs/common';
import {NamespacesService} from "../generated/services";
import {ClassDto, DataTypeDto, FieldDto, IdArrayInputDto, NamespaceDto, PropertyDto} from "../generated/dto";

@Injectable()
export class NamespacesServiceImpl implements NamespacesService {
  /**
   * Returns a list of all namespaces registered in Objectified, regardless of enabled flag status.
   */
  listNamespaces(): NamespaceDto[] {
    return [];
  }

  /**
   * Creates a new namespace.
   */
  createNamespace(namespaceDto: NamespaceDto): void {}

  /**
   * Gets a namespace by its serial ID.
   */
  getNamespaceById(namespaceId: number): NamespaceDto {
    return null;
  }

  /**
   * Applies changes to a `Namespace`, only changing the values supplied in the request body.
   */
  editNamespace(namespaceId: number, namespaceDto: NamespaceDto): void {}

  /**
   * Disables a namespace.
   */
  disableNamespace(namespaceId: number): void {}

  /**
   * Adds `Group`s by ID to a `Namespace` membership by the `Namespace` ID.
   */
  addGroupsToNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `Group`s by ID from a `Namespace` membership by the `Namespace` ID.
   */
  removeGroupsFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Adds `User`s by ID to a `Namespace` membership by the `Namespace` ID.
   */
  addUsersToNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `User`s by ID to a `Namespace` membership by the `Namespace` ID.
   */
  deleteUsersFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Returns a list of all `Class`es registered in the given `Namespace` ID,
   * regardless of status.
   */
  listClassesByNamespace(namespaceId: number): ClassDto[] {
    return [];
  }

  /**
   * Creates a new class.
   */
  addClassesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `Class`es by ID to a `Namespace` membership by the `Namespace` ID.
   */
  deleteClassesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Returns a list of all `DataType`s registered in the given `Namespace` ID, regardless of enabled flag status.
   */
  listDataTypesForNamespace(namespaceId: number): DataTypeDto[] {
    return [];
  }

  /**
   * Assigns `DataType` definitions to a `Namespace`.
   */
  addDataTypesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `DataType`s by ID to a `Namespace` membership by the `Namespace` ID.
   */
  deleteDataTypesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Returns a list of all `Field`s registered in the given `Namespace` ID,
   * regardless of enabled flag status.
   */
  listFields(namespaceId: number): FieldDto[] {
    return [];
  }

  /**
   * Assigns `Field` definitions to a `Namespace`.
   */
  addFieldsToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `Field`s by ID to a `Namespace` membership by the `Namespace` ID.
   */
  deleteFieldsFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Returns a list of all `Properties` registered in the given `Namespace` ID, regardless of status.
   */
  listPropertiesByNamespace(namespaceId: number): PropertyDto[] {
    return [];
  }

  /**
   * Assigns `Property` definitions to a `Namespace`.
   */
  addPropertiesToNamespace(namespaceId: number, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `Properties` by ID to a `Namespace` membership by the `Namespace` ID.
   */
  deletePropertiesFromNamespace(namespaceId: bigint, idArrayInputDto: IdArrayInputDto): void {}
}
