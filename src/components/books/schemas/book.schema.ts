import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class Book {
  @Prop({ type: String, required: true, maxlength: 255 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 2000 })
  description: string;

  @Prop({ type: String, required: true, maxlength: 255 })
  author: string;

  @Prop({ type: Number, required: true, min: 0, max: new Date().getFullYear() })
  year: number;

  @Prop({ type: String, maxlength: 1000 })
  cover: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
