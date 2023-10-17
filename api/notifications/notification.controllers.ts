import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Notification from "./notification.model";
// import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

dotenv.config();

const admin = require("firebase-admin");

export const notificationUpdateToken = async (req: any, res: Response) => {
  try {
    const notification = await Notification.findOne({
      userID: req.user[0]._id,
    });

    if (
      notification.tokenID === "" ||
      notification.tokenID !== req.body.token
    ) {
      await notification.updateOne({ tokenID: req.body.token }).exec();

      res.status(200).json(notification);
    } else {
      res.status(200).json(notification);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const notificationSend = async (req: any, res: Response) => {
  try {
    // const loggedInUser = await User.findById(req.user[0]._id);
    const notification = await Notification.findOne({
      userID: req.user[0]._id,
    });

    const notificationResponse = await admin.messaging().sendMulticast({
      tokens: req.body.tokens,
      notification: {
        title: `${req.body.firstName} is busy!`,
        body: `${req.body.firstName} completed ${req.body.habitName}__🐌`,
        // imageUrl: "https://www.habitune.net/image/empty-shell",
      },
    });

    notification
      .updateOne({
        $push: {
          notifications: {
            title: req.body.title,
            body: req.body.body,
            imageUrl: req.body.imageUrl,
            friend: req.body.friend,
            firstName: req.body.firstName,
            friendImage: req.body.friendImage,
            habitName: req.body.habitName,
          },
        },
      })
      .exec();

    res.status(200).json(notification);
  } catch (error) {
    console.log("error controller noti: ", error);
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
