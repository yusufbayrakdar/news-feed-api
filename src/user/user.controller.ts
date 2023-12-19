import {Body, Controller, Post, UseGuards} from "@nestjs/common";

import {UserService} from "./user.service";

import {UserGuard} from "./user.guard";

import {UserId} from "src/utilities/decorators/user.decorator";
import {ExceptionBadRequest} from "src/utilities/exceptions";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Post("categories")
  saveCategories(@UserId() userId: String, @Body() categories: Array<String>) {
    try {
      return this.userService.findByIdAndUpdate(userId, {categories});
    } catch (error) {
      throw new ExceptionBadRequest(error);
    }
  }
}
