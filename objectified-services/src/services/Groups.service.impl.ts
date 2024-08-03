import {Injectable, Logger} from '@nestjs/common';
import {GroupsService} from "../generated/services";
import {GroupDto, IdArrayInputDto} from "../generated/dto";

@Injectable()
export class GroupsServiceImpl implements GroupsService {
  private readonly logger = new Logger('GroupsServiceImpl');

  /**
   * Returns a list of all `Group`s registered.
   */
  listGroups(): GroupDto[] {
    return [];
  }

  /**
   * Creates a new `Group`.
   */
  createGroup(groupDto: GroupDto): void {}

  /**
   * Returns a `Group` object by its `Group` ID.
   */
  getGroupById(groupId: bigint): GroupDto {
    return null;
  }

  /**
   * Edits a `Group` object by its `Group` ID.
   */
  editGroupById(groupId: bigint, groupDto: GroupDto): void {}

  /**
   * Deletes a `Group` and its members by `Group` ID.
   */
  deleteGroupById(groupId: bigint): void {}

  /**
   * Adds `User`s by ID to a `Group` membership by the `Group` ID.
   */
  addUsersToGroup(groupId: bigint, idArrayInputDto: IdArrayInputDto): void {}

  /**
   * Removes `User`s by ID from a `Group` membership by the `Group` ID.
   */
  deleteUsersFromGroup(groupId: bigint[], idArrayInputDto: IdArrayInputDto): void {}
}
