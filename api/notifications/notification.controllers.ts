import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Notification from "./notification.model";
import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";
import mongoose from "mongoose";

dotenv.config();

const admin = require("firebase-admin");

export const notificationPush = async (req: IReq | any, res: Response) => {
  try {
    // const { user, tokenID } = req.body;

    // const objID = mongoose.Types.ObjectId(user)

    // if (!objID) {
    //   return next(new AppError('Invalid User ID', 400));
    // }
    // const obj = await Notification.findOne({ user: user });

    // if (obj)
    //   return res.status(200).json({
    //     status: 'success',
    //     data: {
    //       message: 'Token already registered!',
    //     },
    //   });

    // return factory.createOne(Notification)(req, res, next);
    var a = await admin.messaging().sendMulticast({
      tokens: [
        "fjos6G6vRnqJ32qJV1ZLFZ:APA91bEgayotbn5TVJue7fgFlIvebEKejTwrmAzIi7Xy77KgrTlnWZkj7xsk058lVgSE_FsEJkqe7b2_Dxe3yDkWjncF_OHCllcavuR2N29NosluEjv5KR-yfeBqF0iNkb5-yTpiiUB8",
      ], // ['token_1', 'token_2', ...]
      notification: {
        title: "Test Title",
        body: "Test from backend!",
        imageUrl: "https://my-cdn.com/app-logo.png",
      },
    });

    console.log(a);
    res.status(200).json("notification");
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
