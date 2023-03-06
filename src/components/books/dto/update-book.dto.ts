import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Validate,
} from "class-validator";
import {
  FourLengthValidator,
  AuthorValidator,
  DescriptionValidator,
  TitleValidator,
} from "./custom-dto";

export class UpdateBookDto {
  @IsOptional()
  @Validate(TitleValidator)
  title: string;

  @IsOptional()
  @Validate(DescriptionValidator)
  description: string;

  @IsOptional()
  @Validate(AuthorValidator)
  author: string;

  @IsOptional()
  @IsNumber()
  @Max(new Date().getFullYear())
  @Validate(FourLengthValidator)
  year: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  cover: string;

  @IsOptional()
  @IsNumber()
  version: number;
}
