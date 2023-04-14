import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import passport = require("passport");
import User from "./user.model";
import { error } from "winston";
import { IReq } from "../middlewares/interfaces";
const jwt = require("jsonwebtoken");

import dotenv from "dotenv";

dotenv.config();

// [1]   sub: '111957037018006382563',
// [1]   id: '111957037018006382563',
// http://localhost:1111/api/user/auth/google
// sessionID: 'b2CNb_3UuAevGPhBxzhkfdCC-lECWaOn',

export const signInWithGoogle = async (req: Request, res: Response) => {
  try {
    console.log(
      "🚀 ~ file: user.controllers.ts:19 ~ signInWithGoogle ~ signInWithGoogle TEST 1:"
    );
    res.status(200).json({ message: "DONE!" });
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controllers.ts:23 ~ signInWithGoogle ~ signInWithGoogle ERROR TEST:"
    );
    return res.status(500).send(getErrorMessage(error));
  }
};

export const callbackSignInWithGoogle = async (req: Request, res: Response) => {
  try {
    var token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    console.log(
      "🚀 ~ file: user.controllers.ts:36 ~ callbackSignInWithGoogle ~ callbackSignInWithGoogle TEST 1:"
    );
    res.status(200).json({
      accessToken: token,
      message: "Login Successful",
    });

    // res.status(200).send("Logged in successfully");
  } catch (error) {
    console.log("ERROR2");
    return res.status(500).send(getErrorMessage(error));
  }
};

// export const signInWithGoogleUnauthorized = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     // await userServices.register(req.body);
//     res.status(200).send("Ooops, unauthorized.");
//   } catch (error) {
//     return res.status(500).send(getErrorMessage(error));
//   }
// };

// export const logoutController = async (req: Request, res: Response) => {
//   try {
//     // await userServices.register(req.body);
//     res.status(200).send("Logged out successfully");
//   } catch (error) {
//     return res.status(500).send(getErrorMessage(error));
//   }
// };

export const fetchProfile = async (req: IReq | any, res: Response) => {
  try {
    User.findById({ _id: req?.user?.id });
    console.log(
      "🚀 ~ file: user.controllers.ts:63 ~ fetchProfile ~ fetchProfile TEST 1:"
    );
    res.status(200).send("Inserted successfully");
  } catch (error) {
    console.log("🚀 ~ file: user.controllers.ts:68 ~ fetchProfile ~ ERROR 1:");
    return res.status(500).send(getErrorMessage(error));
  }
};
