import {GroupsService, ServiceResponse} from "../generated/services";
import {GroupDto, IdArrayInputDto} from "../generated/dto";
import {HttpStatus} from "@nestjs/common";
import {JSONSchemaFaker} from "json-schema-faker";
import { Request } from 'express';

export class GroupsServiceImpl implements GroupsService {

  /**
   * Returns a list of all `Group`s registered.
   *
   * - Response code '200': 'An array of `Group`s.'
   * - Response code '401': 'Unauthorized'
   */
  async listGroups(request: Request, ): Promise<ServiceResponse<GroupDto[]>> {
    return {
      returnValue: [],
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Creates a new `Group`.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param groupDto The `Group` object to create.
   */
  async createGroup(request: Request, groupDto: GroupDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Returns a `Group` object by its `Group` ID.
   *
   * - Response code '200': 'A group object.'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Group not found'
   *
   * @param groupId The ID of the `Group`.
   */
  async getGroupById(request: Request, groupId: bigint): Promise<ServiceResponse<GroupDto>> {
    return {
      returnValue: <GroupDto>JSONSchemaFaker.generate(GroupDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Edits a `Group` object by its `Group` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param groupId The ID of the `Group`.
   * @param groupDto The `Group` object to create.
   */
  async editGroupById(request: Request, groupId: bigint, groupDto: GroupDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Deletes a `Group` and its members by `Group` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param groupId The ID of the `Group`.
   */
  async deleteGroupById(request: Request, groupId: bigint): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Adds `User`s by ID to a `Group` membership by the `Group` ID.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Group not found'
   *
   * @param groupId The ID of the `Group`s.
   * @param idArrayInputDto The parameters containing the `User` and `Group` IDs.
   */
  async addUsersToGroup(request: Request, groupId: bigint, idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Removes `User`s by ID from a `Group` membership by the `Group` ID.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Group not found'
   *
   * @param groupId The IDs of the `Group`s.
   * @param idArrayInputDto The parameters containing the `User` and `Group` IDs.
   */
  async deleteUsersFromGroup(request: Request, groupId: bigint[], idArrayInputDto: IdArrayInputDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}