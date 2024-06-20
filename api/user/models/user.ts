import mongoose, { Schema } from 'mongoose'
import { IUser } from '../../middlewares/interfaces'

const friendSchema = new Schema({
  friend: { type: String, required: true },
  pending: { type: Boolean, required: true },
  paired: { type: Boolean, default: false },
})

const userSchema = new Schema<IUser>({
  _id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, index: true },
  image: { type: String },
  habits: [mongoose.Schema.Types.ObjectId],
  friends: [friendSchema],
  password: { type: String },
  fcmToken: { type: String },
  feedback: { type: [], default: [] },
  lastLogin: { type: Date, default: Date.now },
  lastHabitUpdated: { type: Date, default: Date.now },
  dayOneNotificationSent: { type: Boolean, default: false },
  dayThreeNotificationSent: { type: Boolean, default: false },
  daySevenNotificationSent: { type: Boolean, default: false },
  dayThirtyNotificationSent: { type: Boolean, default: false },
  dayNinetyNotificationSent: { type: Boolean, default: false },
  userType: { type: String, default: 'standart' },
  theme: { type: String, default: 'default' },
  createdAt: { type: Date, default: Date.now },
})

export = mongoose.model<IUser>('User', userSchema)
