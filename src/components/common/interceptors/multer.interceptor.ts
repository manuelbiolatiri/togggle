import { extname, join } from "path";
import { diskStorage } from "multer";
import { nanoid } from "nanoid";
import { existsSync, mkdirSync } from "fs";

export const multerOptions = {
  limits: {
    fileSize: 100000000,
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = join(__dirname, "..", "temp");
      if (!existsSync(uploadPath)) mkdirSync(uploadPath);

      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) =>
      cb(null, `${nanoid()}${extname(file.originalname)}`),
  }),
};
