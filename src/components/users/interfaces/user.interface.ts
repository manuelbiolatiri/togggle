import { Types } from "mongoose";

export interface IUser {
  id?: Types.ObjectId;
  username?: string;
}
