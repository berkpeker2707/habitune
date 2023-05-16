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
}

export interface IHabit {
  owner: Types.ObjectId;
  name: string;
  color: string;
  sharedWith: Types.ObjectId[];
  firstDate: Date;
  lastDate: Date;
  dates: Date[];
}

export interface IReq extends Request {
  user: IUser;
}
export interface IReq extends Request {
  habit: IHabit;
}