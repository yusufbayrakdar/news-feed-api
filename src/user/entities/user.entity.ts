import {Document} from "mongoose";

export class User extends Document {
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  categories: Array<String>;
  lastLoginDate: Date;
}

export const UserSelects = {
  basic: "firstName lastName email categories lastLoginDate"
};
