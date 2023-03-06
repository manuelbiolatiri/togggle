import { IsNotEmpty, IsUrl } from "class-validator";

export class UpdateBookCoverUrlDto {
  @IsNotEmpty()
  @IsUrl()
  fileUrl: string;
}
