import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import * as bcrypt from "bcryptjs";
import {Model} from "mongoose";

import {ExceptionBadRequest} from "../utilities/exceptions";

import {LoginAuthDto} from "../auth/dto/login-auth.dto";
import {User, UserSelects} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private userModel: Model<User>) {}

  async findByLogin(userDTO: LoginAuthDto) {
    const {email, password} = userDTO;
    const user = await this.userModel.findOne({email}).select(UserSelects.basic + " password");
    const isAuthorized = await bcrypt.compare(password, user.password);

    if (isAuthorized) {
      return this.sanitizeUser(user);
    } else throw new ExceptionBadRequest("Email or password is invalid");
  }

  findById(_id: string) {
    return this.userModel.findById(_id).select(UserSelects.basic);
  }

  checkExist(fields: Object) {
    return this.userModel.exists(fields);
  }

  updateLastLoginField(_id: string) {
    return this.userModel.findByIdAndUpdate(_id, {lastLogin: new Date()});
  }

  findOneAndUpdate(filter, updateQuery) {
    return this.userModel
      .findOneAndUpdate(filter, updateQuery, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
        context: "query"
      })
      .select(UserSelects.basic);
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }
}
