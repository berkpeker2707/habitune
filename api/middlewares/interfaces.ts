import { Request } from 'express'
import { Types } from 'mongoose'

// interface representing User
export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  image: string
  habits: Types.ObjectId[]
  friends: [{ friend: Types.ObjectId; pending: boolean; paired: boolean }]
  password: any
  fcmToken: string
  feedback: Array<string>
  lastLogin: Date
  lastHabitUpdated: Date
  dayOneNotificationSent: boolean
  dayThreeNotificationSent: boolean
  daySevenNotificationSent: boolean
  dayThirtyNotificationSent: boolean
  dayNinetyNotificationSent: boolean
  userType: string
  theme: string
  createdAt: Date
}

export interface IHabit {
  owner: string
  name: string
  color: string
  sharedWith: string[]
  firstDate: Date
  lastDate: Date
  dates: Date[]
  upcomingDates: Date[]
  isHidden: boolean
}

export interface IReq extends Request {
  user: IUser
}
export interface IReq extends Request {
  habit: IHabit
}
