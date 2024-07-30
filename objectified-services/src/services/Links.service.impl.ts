import { LinksService } from '@objectified/objectified-api/dist/generated/services';
import { LinkDto, LinkDefDto } from '@objectified/objectified-api/dist/generated/dto';

export class LinksServiceImpl implements LinksService {
  /**
   * Creates a link object that links two classes between each other.
   */
  createLink(linkDto: LinkDto): void {}

  /**
   * Retrieves a `Link` by ID.
   */
  getLinkById(linkId: number): LinkDto {
    return null;
  }

  /**
   * Edits a `Link`.
   */
  editLink(linkId: number): LinkDto {
    return null;
  }

  /**
   * Deletes a `Link`.
   */
  disableLink(linkId: number): void {}

  /**
   * Creates a `LinkDef` object that links two classes between each other.
   */
  createLinkDefinition(linkDefDto: LinkDefDto): void {}

  /**
   * Retrieves a `LinkDef` by its `LinkDef` ID.
   */
  getLinkDefinitionById(linkDefinitionId: number): LinkDefDto {
    return null;
  }

  /**
   * Edits a `LinkDef`.
   */
  editLinkDefinition(linkDefinitionId: number): LinkDefDto {
    return null;
  }

  /**
   * Deletes a `LinkDef` and any `Link`s associated with it.
   */
  deleteLinkDefinition(linkDefinitionId: number): void {}
}
