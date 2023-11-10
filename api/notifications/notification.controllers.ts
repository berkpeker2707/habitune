import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Notification from "./notification.model";
import User from "../user/user.model";

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

      await User.findByIdAndUpdate(req.user[0]._id, {
        fcmToken: req.body.token,
      });

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
    const notification = await Notification.findOne({
      userID: req.user[0]._id,
    });

    const randomBodies = [
      `${req.body.firstName} achieved a new milestone in ${req.body.habitName}! __🐌`,
      `${req.body.firstName} just made progress in their ${req.body.habitName} journey! 🚀`,
      `Celebrate with ${req.body.firstName} as they completed another task in ${req.body.habitName}! 🥳`,
      `${req.body.firstName} completed their ${req.body.habitName} task! 🌟`,
      `New achievement unlocked: ${req.body.firstName} mastered ${req.body.habitName}! 🏆`,
      `${req.body.firstName} is on fire with their ${req.body.habitName} progress! 🔥`,
      `Cheers to ${req.body.firstName} for reaching a milestone in ${req.body.habitName}! 🥂`,
    ];

    const randomBody =
      randomBodies[Math.floor(Math.random() * randomBodies.length)];

    const notificationResponse = await admin.messaging().sendMulticast({
      tokens: req.body.tokens,
      notification: {
        title: `${req.body.firstName} completed a habit!`,
        body: randomBody,
        // imageUrl: "https://www.habitune.net/image/empty-shell",
      },
    });

    notification
      .updateOne({
        $push: {
          notifications: {
            title: `${req.body.firstName} completed a habit!`,
            body: randomBody,
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
