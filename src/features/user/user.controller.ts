import {Controller, Get, NotFoundException, Param, Query} from "@nestjs/common";

import {UserPublicData} from "./entity";
import {GetUsersByQuery} from "./dto";
import {UserService} from "./user.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get("search")
  async getUsersByQuery(
    @Query() {q: query, limit}: GetUsersByQuery
  ): Promise<{users: UserPublicData[]}> {
    const users = await this.userService.findUsersByQuery(query, {limit});

    return {
      users: users.map((user) => user.getPublicData())
    };
  }

  @Get(":id")
  async getUser(
    @Param("id") id: string
  ): Promise<{user: UserPublicData}> {
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException("User not found");

    return {
      user: user.getPublicData()
    };
  }
}
