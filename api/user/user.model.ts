import mongoose, { Schema } from "mongoose";
import { IUser } from "../middlewares/interfaces";

const userSchema = new Schema<IUser>({
  id: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  image: { type: String },
  habits: [mongoose.Schema.Types.ObjectId],
  friends: [{ friend: mongoose.Schema.Types.ObjectId, pending: Boolean }],
  password: { type: String },
});

export = mongoose.model<IUser>("User", userSchema);
