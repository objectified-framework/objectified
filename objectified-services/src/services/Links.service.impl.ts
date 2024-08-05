import {LinksService, ServiceResponse} from "../generated/services";
import {InstanceDto, LinkDefDto, LinkDto} from "../generated/dto";
import {LinkDao} from "../dao/Link.dao";
import {JSONSchemaFaker} from "json-schema-faker";
import {HttpStatus} from "@nestjs/common";
import { Request } from 'express';

export class LinksServiceImpl implements LinksService {

  /**
   * Creates a link object that links two classes between each other.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param linkDto The link object to create.
   */
  async createLink(request: Request, linkDto: LinkDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Retrieves a `Link` by ID.
   *
   * - Response code '200': 'OK'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link not found'
   *
   * @param linkId The ID of the `Link` to retrieve.
   */
  async getLinkById(request: Request, linkId: number): Promise<ServiceResponse<LinkDto>> {
    return {
      returnValue: <LinkDto>JSONSchemaFaker.generate(LinkDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Edits a `Link`.
   *
   * - Response code '200': 'OK, returns the `Link` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link not found'
   *
   * @param linkId The ID of the `Link` to retrieve.
   */
  async editLink(request: Request, linkId: number): Promise<ServiceResponse<LinkDto>> {
    return {
      returnValue: <LinkDto>JSONSchemaFaker.generate(LinkDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Deletes a `Link`.
   *
   * - Response code '204': 'No content'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link not found'
   *
   * @param linkId The ID of the `Link` to disable.
   */
  async disableLink(request: Request, linkId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  /**
   * Creates a `LinkDef` object that links two classes between each other.
   *
   * - Response code '201': 'Created successfully'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   *
   * @param linkDefDto The `LinkDef` object to create.
   */
  async createLinkDefinition(request: Request, linkDefDto: LinkDefDto): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Retrieves a `LinkDef` by its `LinkDef` ID.
   *
   * - Response code '200': 'OK'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link Definition not found'
   *
   * @param linkDefinitionId The ID of the `LinkDef` to retrieve.
   */
  async getLinkDefinitionById(request: Request, linkDefinitionId: number): Promise<ServiceResponse<LinkDefDto>> {
    return {
      returnValue: <LinkDefDto>JSONSchemaFaker.generate(LinkDefDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Edits a `LinkDef`.
   *
   * - Response code '200': 'OK, returns the `LinkDef` object after editing.'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link Definition not found'
   *
   * @param linkDefinitionId The ID of the `LinkDef` to retrieve.
   */
  async editLinkDefinition(request: Request, linkDefinitionId: number): Promise<ServiceResponse<LinkDefDto>> {
    return {
      returnValue: <LinkDefDto>JSONSchemaFaker.generate(LinkDefDto.schema),
      returnContentType: 'application/json',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Deletes a `LinkDef` and any `Link`s associated with it.
   *
   * - Response code '204': 'No content'
   * - Response code '400': 'Bad request'
   * - Response code '401': 'Unauthorized'
   * - Response code '404': 'Link Definition not found'
   *
   * @param linkDefinitionId The ID of the `LinkDef` to delete.
   */
  async deleteLinkDefinition(request: Request, linkDefinitionId: number): Promise<ServiceResponse<null>> {
    return {
      returnValue: null,
      returnContentType: 'application/json',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

}