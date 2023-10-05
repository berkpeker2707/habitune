import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema<any>({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tokenID: {
    type: String,
    required: true,
  },
  notifications: {
    type: [Object],
  },
  data: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export = mongoose.model<any>("Notification", notificationSchema);
