import { Schema, model } from "mongoose";

interface IRandomUser {
  fullName: string;
  IdNumber: number;
}

const randomUserSchema = new Schema<IRandomUser>({
  fullName: {
    type: String,
    required: true,
  },
  IdNumber: {
    type: Number,
    required: true,
  },
});

const RandomUser = model<IRandomUser>("RandomUser", randomUserSchema);
module.exports = RandomUser;
