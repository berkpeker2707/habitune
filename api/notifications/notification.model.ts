import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema<any>({
  userID: {
    type: String,
    ref: 'User',
    // unique: true,
    // index: true,
  },
  habitID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    // unique: true,
    // index: true,
  },
  notificationTitle: {
    type: String,
  },
  notificationBody: {
    type: String,
  },
  notificationImageUrl: {
    type: String,
  },
  notificationFriend: {
    type: Array,
  },
  notificationFriendImage: {
    type: Array,
  },
  notificationFirstName: {
    type: String,
  },
  notificationHabitName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    // default: () => new Date(Date.now() + 1 * 60 * 1000), //1 minutes in milliseconds
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in milliseconds
    index: { expires: '5m' }, //create a TTL (Time-To-Live) index, where documents expire after 5 minute
  },
})

export = mongoose.model<any>('Notification', notificationSchema)
