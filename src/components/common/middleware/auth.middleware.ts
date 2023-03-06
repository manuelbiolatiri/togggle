import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { AuthService } from "../../auth/auth.service";
import { UserService } from "../../users/user.service";
import { IRequest } from "../interfaces/req.interface";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
    let token = req.headers["authorization"] as string;

    if (!token)
      return res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const decoded = await this.authService.verifyAuthToken(token);

    if (!decoded) {
      return res.status(401).send({
        statusCode: 401,
        message: "Unable to verify authorization",
      });
    }

    const userExist = await this.userService.findById(decoded["user"]?.id);

    if (!userExist)
      return res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });

    if (userExist) req.user = Object.assign(userExist, { id: userExist._id });

    next();
  }
}
