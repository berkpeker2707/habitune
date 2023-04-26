import { Request } from "express";
import { Types } from "mongoose";

// interface representing User
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  habitIds: number[];
  friends: [{ friend: Types.ObjectId; pending: boolean }];
}

export interface IReq extends Request {
  user: IUser;
}
