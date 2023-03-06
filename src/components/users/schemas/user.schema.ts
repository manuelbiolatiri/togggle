import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
