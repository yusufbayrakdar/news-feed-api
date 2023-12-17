import {Injectable} from "@nestjs/common";

import {ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator} from "class-validator";

import {UserService} from "../../user/user.service";

export function IsEmailUnique(onlyAlpha?: boolean, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsEmailUnique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: ValidatorIsEmailUnique
    });
  };
}

@Injectable()
@ValidatorConstraint({async: true})
export class ValidatorIsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: any) {
    const isExist = await this.userService.checkExist({email});
    return Boolean(!isExist);
  }

  defaultMessage(): string {
    return `Email is already exist!`;
  }
}
