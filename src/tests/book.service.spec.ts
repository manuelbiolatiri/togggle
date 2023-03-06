import {
  BookAlreadyExists,
  ConcurrentConflict,
} from "./../components/books/exceptions/book.exceptions";
import { BookService } from "../components/books/book.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model, Document } from "mongoose";
import { Book, BookSchema } from "../components/books/schemas/book.schema";
import { getModelToken } from "@nestjs/mongoose";

let mongod: MongoMemoryServer;
let mongoConnection: Connection;
let bookModel: Model<Document<Book>>;
let bookService: BookService;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoConnection = (await connect(uri, { useUnifiedTopology: true }))
    .connection;

  bookModel = mongoConnection.model(Book.name, BookSchema);

  const app: TestingModule = await Test.createTestingModule({
    providers: [
      BookService,
      { provide: getModelToken(Book.name), useValue: bookModel },
    ],
  }).compile();

  bookService = app.get<BookService>(BookService);
});

afterAll(async () => {
  await mongoConnection.close();
  await mongod.stop();

  setTimeout(async () => {
    await mongoConnection.dropDatabase();
  }, 1000);
});

afterEach(async () => {
  const collections = mongoConnection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe("Create book", () => {
  it("should return the saved book", async () => {
    const book = await bookService.createBook({
      title: "title test",
      description: "des test desp",
      author: "test-author",
      year: 2000,
    });

    expect(book.title).toBe("title test");
  });

  it("should throw BookAlreadyExists (Bad Request - 400) exception", async () => {
    try {
      await bookService.createBook({
        title: "title test",
        description: "des test desp",
        author: "test-author",
        year: 2000,
      });

      await bookService.createBook({
        title: "title test",
        description: "des test desp",
        author: "test-author",
        year: 2000,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(BookAlreadyExists);
    }
  });
});

describe("Update book", () => {
  it("should update book", async () => {
    const book = await bookService.createBook({
      title: "title test",
      description: "des test desp111",
      author: "test-author",
      year: 2000,
    });

    const updatedBook = await bookService.updateBook(book.id, {
      title: "title test",
      description: "des test desp222",
      author: "test-author",
      year: 2000,
      version: book.__v,
    });

    expect(updatedBook.description).toBe("des test desp222");
  });

  it("should throw ConcurrentConflict (Bad Request - 400)", async () => {
    try {
      const book = await bookService.createBook({
        title: "title test",
        description: "des test desp111",
        author: "test-author",
        year: 2000,
      });

      await bookService.updateBook(book.id, {
        title: "title test",
        description: "des test desp222",
        author: "test-author",
        year: 2000,
        version: 1,
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(ConcurrentConflict);
    }
  });
});
