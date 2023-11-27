import { Request } from "express";
import { Types } from "mongoose";

// interface representing User
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  habits: Types.ObjectId[];
  friends: [{ friend: Types.ObjectId; pending: boolean }];
  password: any;
  fcmToken: string;
  lastLogin: Date;
  lastHabitUpdated: Date;
  dayOneNotificationSent: boolean;
  dayThreeNotificationSent: boolean;
  daySevenNotificationSent: boolean;
  dayThirtyNotificationSent: boolean;
  userType: string;
  theme: string;
  createdAt: Date;
}

export interface IHabit {
  owner: Types.ObjectId;
  name: string;
  color: string;
  sharedWith: Types.ObjectId[];
  firstDate: Date;
  lastDate: Date;
  dates: Date[];
  upcomingDates: Date[];
}

export interface IReq extends Request {
  user: IUser;
}
export interface IReq extends Request {
  habit: IHabit;
}
