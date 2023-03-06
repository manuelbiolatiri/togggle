import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../common/interceptors/multer.interceptor";
import { FileService } from "./file.service";
import { IUploadFIle } from "../common/interfaces";

@Controller("/files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file", multerOptions))
  async uploadFile(@UploadedFile() file: IUploadFIle): Promise<any> {
    if (!file) throw new BadRequestException(`File is required.`);

    return await this.fileService.uploadFileToCloudinary(file);
  }
}
