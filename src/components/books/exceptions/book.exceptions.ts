import { BadRequestException } from "@nestjs/common";

export class BookAlreadyExists extends BadRequestException {
  constructor(bookTitle: string) {
    super(`Book with title: ${bookTitle} already exists`);
  }
}

export class ConcurrentConflict extends BadRequestException {
  constructor(bookTitle: string) {
    super(
      `An update has been made to book: ${bookTitle}, please refresh and try again`
    );
  }
}

export class SystemError extends BadRequestException {
  constructor() {
    super(`An error occurred`);
  }
}
