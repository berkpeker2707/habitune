import mongoose, { Schema } from "mongoose";
import { IUser } from "../middlewares/interfaces";

// schema corresponding to the document interface
const userSchema = new Schema<IUser>({
  id: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  image: { type: String },
  habitIds: [Number],
  friends: [{ friend: mongoose.Schema.Types.ObjectId, pending: Boolean }],
});

export = mongoose.model<IUser>("User", userSchema);
