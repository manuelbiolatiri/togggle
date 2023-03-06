import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { v2 } from "cloudinary";
import { unlinkSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { promisify } from "util";
import { IUploadFIle } from "../common/interfaces";

const cloudinaryUploadPromise = promisify(v2.uploader.upload_large).bind(v2);

@Injectable()
export class FileService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFileToCloudinary(file: IUploadFIle): Promise<string> {
    if (
      !file.mimetype.includes("jpg") &&
      !file.mimetype.includes("jpeg") &&
      !file.mimetype.includes("png")
    ) {
      throw new BadRequestException(`File is must be any of jpg, jpeg or png.`);
    }

    try {
      const public_id = uuidv4() + extname(file.originalname);
      const secureUrl = await (
        await cloudinaryUploadPromise(file.path, {
          resource_type: "raw",
          public_id,
        })
      ).secure_url;

      unlinkSync(file.path);

      return secureUrl;
    } catch (error) {
      console.log("cloudinary error", error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
