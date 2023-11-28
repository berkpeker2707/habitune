import User from "../user/user.model";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

import isInYesterday from "../middlewares/isInYesterday";
import threeToFiveDays from "../middlewares/threeToFiveDays";

dotenv.config();

const schedule = require("node-schedule");

const admin = require("firebase-admin");

export const notifyUsersDaily = async () => {
  // dayOneNotificationSent

  //every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //every 6 hours
  schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
      // console.log("timer yesterday run");

      // This function will run every hour
      // var selectUsers = await User.find({}).select("lastHabitUpdated");
      var selectUsers = await User.find({
        dayOneNotificationSent: false,
        dayThreeNotificationSent: false,
        daySevenNotificationSent: false,
        dayThirtyNotificationSent: false,
        dayNinetyNotificationSent: false,
      }).select("lastHabitUpdated fcmToken");

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:30 ~ schedule.scheduleJob ~ selectUsers:",
      //   selectUsers
      // );

      const result: boolean[] = await Promise.all(
        selectUsers.map(async (selectUser) => {
          return await isInYesterday(
            [selectUser.lastHabitUpdated],
            new Date(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds()
              )
            )
          );
        })
      );

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:53 ~ schedule.scheduleJob ~ result:",
      //   result
      // );

      //users who did not loggedin within last 24 hour
      const filteredUsersFCM = selectUsers
        .filter((user, index) => result[index])
        .map((user) => user.fcmToken);

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:62 ~ //schedule.scheduleJob ~ filteredUsersFCM:",
      //   filteredUsersFCM
      // );

      var fcmTokensBelongedToUpdated = await User.updateMany(
        {
          fcmToken: filteredUsersFCM,
        },
        { $set: { dayOneNotificationSent: true } }
      );

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
      //   fcmTokensBelongedToUpdated
      // );

      if (filteredUsersFCM.length > 0) {
        const notificationResponse = await admin.messaging().sendMulticast({
          tokens: filteredUsersFCM,
          notification: {
            title: `Fresh Start 🌱`,
            body: "Keep building your habits!",
            // imageUrl: "https://www.habitune.net/image/empty-shell",
          },
        });
      }
    } catch (error) {
      Logger.error(error);
    }
  });
};

export const notifyUsersThreeDaysLater = async () => {
  // dayThreeNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //every day at 12:00 AM
  schedule.scheduleJob("0 0 * * *", async () => {
    try {
      // console.log("timer three days ago run");

      // This function will run every hour
      // var selectUsers = await User.find({}).select("lastHabitUpdated");
      var selectUsers = await User.find({
        dayOneNotificationSent: true,
        dayThreeNotificationSent: false,
        daySevenNotificationSent: false,
        dayThirtyNotificationSent: false,
        dayNinetyNotificationSent: false,
      }).select("lastHabitUpdated fcmToken");

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:30 ~ schedule.scheduleJob ~ selectUsers:",
      //   selectUsers
      // );

      const result: boolean[] = await Promise.all(
        selectUsers.map(async (selectUser) => {
          return await threeToFiveDays(
            [selectUser.lastHabitUpdated],
            new Date(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds()
              )
            )
          );
        })
      );

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:53 ~ schedule.scheduleJob ~ result:",
      //   result
      // );

      //users who did not loggedin within last 3 to 5 days
      const filteredUsersFCM = selectUsers
        .filter((user, index) => result[index])
        .map((user) => user.fcmToken);

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:62 ~ //schedule.scheduleJob ~ filteredUsersFCM:",
      //   filteredUsersFCM
      // );

      var fcmTokensBelongedToUpdated = await User.updateMany(
        {
          fcmToken: filteredUsersFCM,
        },
        { $set: { dayThreeNotificationSent: true } }
      );

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
      //   fcmTokensBelongedToUpdated
      // );

      if (filteredUsersFCM.length > 0) {
        const notificationResponse = await admin.messaging().sendMulticast({
          tokens: filteredUsersFCM,
          notification: {
            title: `You can do this! ✊`,
            body: "Building a habit takes 2 weeks to 3 months. Don't give up!",
            // imageUrl: "https://www.habitune.net/image/empty-shell",
          },
        });
      }
    } catch (error) {
      Logger.error(error);
    }
  });
};
