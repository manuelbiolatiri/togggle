import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Book, BookSchema } from "./schemas/book.schema";
import { BookService } from "./book.service";
import { BookController } from "./books.controller";
import { FileModule } from "../file/file.module";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    forwardRef(() => AuthModule),
    FileModule,
  ],
  controllers: [BookController],
  providers: [BookService, FileModule],
  exports: [BookService],
})
export class BookModule {}
