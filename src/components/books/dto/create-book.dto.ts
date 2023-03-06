import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Validate,
} from "class-validator";
import {
  FourLengthValidator,
  TitleValidator,
  DescriptionValidator,
  AuthorValidator,
} from "./custom-dto";

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @Validate(TitleValidator)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Validate(DescriptionValidator)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Validate(AuthorValidator)
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(new Date().getFullYear())
  @Validate(FourLengthValidator)
  year: number;

  @IsOptional()
  @IsUrl()
  cover: string;
}
