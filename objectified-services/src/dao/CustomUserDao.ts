import {DaoUtils, UserDao} from "../generated/dao";
import {UserDto} from "../generated/dto";

export class CustomUserDao extends UserDao {
  constructor() {
    super();
  }

  public async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.findOne({ email: email });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  }

  public async getUserById(id: string): Promise<UserDto> {
    const user = await this.findOne({ id: id });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }
}