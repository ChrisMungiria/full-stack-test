import mongoose, { Schema, model } from "mongoose";

interface ILocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface IUserActivity {
  userID: mongoose.Schema.Types.ObjectId;
  loginTime: Date;
  logoutTime: Date;
  location: ILocation;
}

const locationSchema = new Schema<ILocation>({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const userActivitySchema = new Schema<IUserActivity>({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  logoutTime: {
    type: Date,
  },
  location: [locationSchema],
});

const UserActivity = model<IUserActivity>("UserActivity", userActivitySchema);
module.exports = UserActivity;
