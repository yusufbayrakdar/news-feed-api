import * as bcrypt from "bcryptjs";
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true
    },
    firstName: {
      type: String,
      trim: true,
      default: ""
    },
    lastName: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      lowercase: true,
      index: true
    },
    password: {type: String, set: toHashPassword, select: false},
    lastLoginDate: Date
  },
  {timestamps: true}
);

function toHashPassword(password) {
  if (password) {
    return bcrypt.hashSync(password, 10);
  }
}
