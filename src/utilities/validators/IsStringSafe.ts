import {ValidationOptions, registerDecorator} from "class-validator";

import {isStringSafeAndValid} from "../helpers";

export function IsStringSafe(onlyAlpha?: boolean, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsStringSafe",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [onlyAlpha],
      options: validationOptions,
      validator: {
        validate(field: string) {
          return isStringSafeAndValid(field, onlyAlpha);
        },
        defaultMessage() {
          return "$property has invalid text";
        }
      }
    });
  };
}
