import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;
}
