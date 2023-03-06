import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { IUser } from "./interfaces/user.interface";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async createUser(payload: IUser): Promise<User> {
    const userExist = await this.findByUsername(payload.username);

    if (userExist) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with username: ${payload.username} already exist`,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.userModel.create(payload);
  }
}
