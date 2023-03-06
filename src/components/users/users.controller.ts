import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { ok } from "../common/utils/baseResponse";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  async createUser(@Body() Payload: CreateUserDto) {
    const data = await this.userService.createUser(Payload);
    return ok(data);
  }
}
