import { extname, join } from "path";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
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
      cb(null, `${uuidv4()}${extname(file.originalname)}`),
  }),
};
