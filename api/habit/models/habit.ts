import mongoose, { Schema } from 'mongoose'
import { IHabit } from '../../middlewares/interfaces'

const habitSchema = new Schema<IHabit>({
    _id: { type: String },
    owner: { type: String },
    name: { type: String },
    color: { type: String },
    sharedWith: [{ type: String }],
    firstDate: { type: Date },
    lastDate: { type: Date },
    dates: [{ type: Date }],
    upcomingDates: [{ type: Date }],
    isHidden: { type: Boolean, default: false },
})

export = mongoose.model<IHabit>('Habit', habitSchema)
