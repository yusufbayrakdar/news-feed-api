import {Module} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";

import {UserController} from "./user.controller";

import {UserService} from "./user.service";

import {UserSchema} from "./models/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UserModule {}
