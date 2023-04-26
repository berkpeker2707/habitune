import mongoose, { Schema } from "mongoose";
import { IHabit } from "../middlewares/interfaces";

const habitSchema = new Schema<IHabit>({
  owner: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  color: { type: String },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId }],
  firstDate: { type: Date },
  lastDate: { type: Date },
  dates: [{ type: Date }],
});

export = mongoose.model<IHabit>("Habit", habitSchema);
