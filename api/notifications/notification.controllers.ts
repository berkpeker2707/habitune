import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Notification from "./notification.model";
import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import { infoLogger, errorLogger } from "../middlewares/logger";

dotenv.config();

const admin = require("firebase-admin");

export const notificationUpdateToken = async (req: any, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user[0]._id, {
      fcmToken: req.body.token,
    });

    infoLogger.info(`User ${req.user[0]._id} invoked notificationUpdateToken`);
    res.status(200).json(updatedUser);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const notificationSend = async (req: any, res: Response) => {
  try {
    // const notification = await Notification.findOne({
    //   userID: req.user[0]._id,
    // });

    const notification = await Notification.create({
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
        habitID: req.body.habitID,
        notificationTitle: `${req.body.firstName} completed a habit!`,
        notificationBody: randomBody,
        notificationImageUrl: req.body.imageUrl,
        notificationFriend: req.body.friend,
        notificationFriendImage: req.body.friendImage,
        notificationFirstName: req.body.firstName,
        notificationHabitName: req.body.habitName,
      })
      .exec();
    infoLogger.info(`User ${req.user[0]._id} invoked notificationSend`);
    res.status(200).json(notification);
  } catch (error) {
    // console.log("error controller noti: ", error);
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};
