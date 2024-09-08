import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  IdNumber: string;
  mobileNumber: string;
  email: String;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    IdNumber: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
module.exports = User;
