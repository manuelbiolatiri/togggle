import { Request } from "express";
import { Types } from "mongoose";

export interface IRequest extends Request {
  user?: {
    id?: Types.ObjectId;
    username?: string;
  };
}
