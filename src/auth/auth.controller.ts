import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {ApiSecurity} from "@nestjs/swagger";

import {UserService} from "../user/user.service";
import {AuthService} from "./auth.service";

import {UserGuard} from "../user/user.guard";

import {UserId} from "../utilities/decorators/user.decorator";
import {ExceptionBadRequest} from "src/utilities/exceptions";

import {LoginAuthDto} from "./dto/login-auth.dto";
import {RegisterAuthDto} from "./dto/register-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post("register")
  async register(@Body() userDTO: RegisterAuthDto) {
    try {
      const user = await this.userService.findOneAndUpdate(
        {email: userDTO.email},
        {
          firstName: userDTO.firstName,
          lastName: userDTO.lastName,
          password: userDTO.password,
          lastLoginDate: new Date()
        }
      );

      const token = this.authService.generateToken(user._id, user.email);
      return {user, token};
    } catch (error) {
      throw new ExceptionBadRequest(error);
    }
  }

  @Post("login")
  async login(@Body() userDTO: LoginAuthDto) {
    try {
      const user = await this.userService.findByLogin(userDTO);

      this.userService.updateLastLoginField(user._id).exec();

      const token = this.authService.generateToken(user._id, user.email);
      return {user, token};
    } catch (error) {
      throw new ExceptionBadRequest(error);
    }
  }

  @ApiSecurity("token")
  @UseGuards(UserGuard)
  @Get("profile")
  async getProfile(@UserId() userId: string) {
    const user = await this.userService.findById(userId);

    this.userService.updateLastLoginField(userId).exec();

    return {user};
  }
}
