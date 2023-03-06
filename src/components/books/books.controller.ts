import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { FileService } from "../file/file.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Types } from "mongoose";
import { multerOptions } from "../common/interceptors/multer.interceptor";
import { IUploadFIle } from "../common/interfaces";
import { ok, paginated } from "../common/utils/baseResponse";

@Controller("/books")
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private fileService: FileService
  ) {}

  @Post("")
  async createBook(@Body() Payload: CreateBookDto) {
    const book = await this.bookService.createBook(Payload);

    return ok(book);
  }

  @Get("")
  async getBooks(@Param("page") page = 1, @Param("pageSize") pageSize = 30) {
    const { data, count } = await this.bookService.findAll(page, pageSize);

    return paginated(data, {
      page,
      pageSize,
      total: count,
    });
  }

  @Get("/:id")
  async getBook(@Param("id") bookId: Types.ObjectId) {
    const book = await this.bookService.findById(bookId);

    if (!book) {
      throw new BadRequestException({ message: "Book not found" });
    }

    return ok(book);
  }

  @Put("/:id")
  async updateBook(
    @Param("id") bookId: Types.ObjectId,
    @Body() body: UpdateBookDto
  ) {
    const book = await this.bookService.findById(bookId);

    if (!book) {
      throw new BadRequestException({ message: "Book not found" });
    }

    return ok(await this.bookService.updateBook(bookId, body));
  }

  @Delete("/:id")
  async deleteBook(@Param("id") bookId: Types.ObjectId) {
    const deleteBook = await this.bookService.deleteBook(bookId);

    return ok(deleteBook);
  }
}
