import mongoose, { Schema } from "mongoose";
import { IUser } from "../middlewares/interfaces";

const userSchema = new Schema<IUser>({
  id: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, index: true },
  image: { type: String },
  habits: [mongoose.Schema.Types.ObjectId],
  friends: [{ friend: mongoose.Schema.Types.ObjectId, pending: Boolean }],
  password: { type: String },
  fcmToken: { type: String },
  lastLogin: { type: Date, default: Date.now },
});

export = mongoose.model<IUser>("User", userSchema);
