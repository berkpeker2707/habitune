import mongoose, { Schema } from 'mongoose'
import { IUser } from '../../middlewares/interfaces'

const userSchema = new Schema<IUser>({
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, index: true },
    image: { type: String },
    habits: [mongoose.Schema.Types.ObjectId],
    friends: [
        {
            friend: mongoose.Schema.Types.ObjectId,
            pending: Boolean,
            paired: { type: Boolean, default: false },
        },
    ],
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
