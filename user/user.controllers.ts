import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import User from "./user.model";

import { IReq } from "../middlewares/interfaces";
const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

dotenv.config();

export const callbackSignInWithGoogle = async (req: Request, res: Response) => {
  try {
    var token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).json({
      accessToken: token,
      message: "Login Successful",
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const fetchCurrentUserProfile = async (
  req: IReq | any,
  res: Response
) => {
  try {
    const loggedinUser = await User.findById(req.user[0]._id);
    res.status(200).json(loggedinUser);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const fetchUserProfile = async (req: IReq | any, res: Response) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
