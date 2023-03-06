import { IRequest } from "../common/interfaces/req.interface";
import { CreateUserDto } from "./../users/dto/create-user.dto";
import {
  Body,
  Controller,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from "@nestjs/common";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { ok } from "../common/utils/baseResponse";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  @Post("/login")
  async login(@Body() payload: CreateUserDto) {
    const usernameExist = await this.userService.findByUsername(
      payload.username
    );

    if (!usernameExist)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "User does not exist.",
        },
        HttpStatus.NOT_FOUND
      );

    // No password to compare against

    const accessToken = await this.authService.signInUser({
      username: usernameExist.username,
      id: usernameExist._id,
    });

    return ok({ accessToken });
  }

  @Post("/refreshToken")
  async refreshToken(@Req() req: IRequest) {
    const { accessToken, refreshToken } = await this.authService.refreshToken({
      username: req.user.username,
      id: req.user.id,
    });

    return ok({ accessToken, refreshToken });
  }
}
