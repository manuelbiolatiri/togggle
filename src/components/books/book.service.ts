import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Book, BookDocument } from "./schemas/book.schema";
import { CreateBook, UpdateBook } from "./interfaces/book.interface";
import {
  BookAlreadyExists,
  ConcurrentConflict,
} from "./exceptions/book.exceptions";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findById(id: Types.ObjectId): Promise<BookDocument> {
    return this.bookModel.findById(id);
  }

  async createBook(payload: CreateBook): Promise<BookDocument> {
    const bookExist = await this.findBy({ title: payload.title });

    if (bookExist) {
      throw new BookAlreadyExists(payload.title);
    }

    return await this.bookModel.create(payload);
  }

  async updateBook(
    bookId: Types.ObjectId,
    payload: UpdateBook
  ): Promise<BookDocument> {
    // Check that record isn't corrupted
    const optimisticConcurrentUpdate = await this.bookModel.findOneAndUpdate(
      { _id: bookId, __v: payload.version },
      { ...payload, __v: payload.version + 1 },
      { new: true }
    );

    if (!optimisticConcurrentUpdate) {
      throw new ConcurrentConflict(payload.title);
    }

    return optimisticConcurrentUpdate;
  }

  async findBy(payload: Partial<Book>): Promise<BookDocument | null> {
    return this.bookModel.findOne({ ...payload });
  }

  async findAll(
    page: number,
    pageSize: number
  ): Promise<{ data: BookDocument[]; count: number }> {
    const count = await this.bookModel.countDocuments();

    const data = await this.bookModel
      .find()
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return { data, count };
  }

  async deleteBook(id: Types.ObjectId): Promise<BookDocument> {
    return this.bookModel.findOneAndDelete({ _id: id });
  }
}
