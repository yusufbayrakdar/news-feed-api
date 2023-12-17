import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

import {UserService} from "./user.service";

import {ExceptionUnauthorized} from "../utilities/exceptions";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    if (!token) throw new ExceptionUnauthorized();

    try {
      const {id, exp} = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY
      });
      const expireDate = new Date(exp * 1000);
      if (new Date() >= expireDate) throw new ExceptionUnauthorized("Token expired!");

      const _id = id.substring(0, 24);
      const email = id.substring(24);

      const user = await this.userService.findById(_id);
      if (user.email !== email) throw new ExceptionUnauthorized();

      request["user"] = user;
    } catch (error) {
      throw new ExceptionUnauthorized(error?.message);
    }
    return true;
  }
}
