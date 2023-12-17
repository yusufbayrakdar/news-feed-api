import {Injectable} from "@nestjs/common";

import {sign} from "jsonwebtoken";

@Injectable()
export class AuthService {
  generateToken(userId: string, email: string) {
    return sign({id: userId + email}, process.env.SECRET_KEY, {expiresIn: "360 days"});
  }
}
