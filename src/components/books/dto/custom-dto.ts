import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint()
export class FourLengthValidator implements ValidatorConstraintInterface {
  async validate(value: number) {
    if (String(value).length !== 4) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "Year input length must be 4";
  }
}

@ValidatorConstraint()
export class TitleValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (value.length > 255) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "Title cannot must be less than or equal to 255 characters";
  }
}

@ValidatorConstraint()
export class AuthorValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (value.length > 255) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "Author cannot must be less than or equal to 255 characters";
  }
}

@ValidatorConstraint()
export class DescriptionValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (value.length > 2000) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return "Description cannot must be less than or equal to 255 characters";
  }
}
