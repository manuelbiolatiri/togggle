import { IRequest } from "./../common/interfaces/req.interface";
import { IUser } from "./../users/interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { verifyAuthToken } from "../common/utils/index.util";
import config from "../common/config";

@Injectable()
export class AuthService {
  constructor() {}

  public signInUser(user: IUser): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { user },
        config().JWT_KEY,
        { expiresIn: "31d" },
        (err: any, token: string | PromiseLike<string>) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }

  public async verifyAuthToken(token: string) {
    return verifyAuthToken(token);
  }

  // Refresh access token using refresh token
  public async refreshToken(user: IUser) {
    const token = await this.signInUser(user);
    return { accessToken: token, refreshToken: token };
  }
}
