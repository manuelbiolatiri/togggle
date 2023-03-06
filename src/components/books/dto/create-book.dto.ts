import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @Validate(TitleValidator)
  title: string;

  @IsNotEmpty()
  @Validate(DescriptionValidator)
  description: string;

  @IsNotEmpty()
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
