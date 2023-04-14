import { Request } from "express";

// interface representing User
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  habitIds: number[];
  friendIds: number[];
}

export interface IReq extends Request {
  user: IUser;
}
