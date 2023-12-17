import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

import {IsEmailUnique} from "../../utilities/validators/IsEmailUnique";
import {IsStringSafe} from "../../utilities/validators/isStringSafe";

export class RegisterAuthDto {
  @IsString()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  @IsStringSafe()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 250)
  @IsStringSafe()
  lastName: string;
}
