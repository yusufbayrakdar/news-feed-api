import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

import {UserService} from "./user.service";

@Injectable()
export class UserOptionalGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.token;
    if (!token) return true;

    try {
      const {id} = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY
      });

      const _id = id.substring(0, 24);
      const email = id.substring(24);

      const user = await this.userService.findById(_id);
      if (user.email !== email) return true;

      request["user"] = user;
    } catch (error) {
      return true;
    }
    return true;
  }
}
