import User from "../user/user.model";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

import isInYesterday from "../middlewares/isInYesterday";
import isInThreeToFiveDays from "../middlewares/isInThreeToFiveDays";
import isInSevenToFifteenDays from "../middlewares/isInSevenToFifteenDays";

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

      const randomNotification = [
        {
          title: "Daily Delight 🌈",
          body: "Just a friendly reminder: Progress, no matter how small, is still progress. Keep going and embrace the journey! 🚀",
        },
        ,
        {
          title: "Radiant Resilience 🌻",
          body: "Life may have its ups and downs, but so do the paths to success. Your resilience is your strength. Keep pressing forward! 💪",
        },

        {
          title: "Daily Discovery 🌼",
          body: "Every day is a chance to discover the extraordinary within the ordinary. Seize the day, and let your habits guide you toward greatness! 🌟",
        },
        {
          title: "Endless Possibilities 🌌",
          body: "Embrace each moment as an opportunity for growth. Your journey is unique, and you're doing fantastic. Believe in yourself! 🌠",
        },
        {
          title: "Fresh Start 🌱",
          body: "As the day winds down, remember: Your efforts matter. Tomorrow is another chance to grow. 🌱",
        },
      ];

      const notificationContent =
        randomNotification[
          Math.floor(Math.random() * randomNotification.length)
        ];

      if (filteredUsersFCM.length > 0) {
        const notificationResponse = await admin.messaging().sendMulticast({
          tokens: filteredUsersFCM,
          notification: {
            title: notificationContent?.title,
            body: notificationContent?.body,
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
          return await isInThreeToFiveDays(
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

export const notifyUsersSevenDaysLater = async () => {
  // dayThreeNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //at 12:00 AM, every 5 days
  schedule.scheduleJob("0 0 */5 * *", async () => {
    try {
      // console.log("timer three days ago run");

      // This function will run every hour
      // var selectUsers = await User.find({}).select("lastHabitUpdated");
      var selectUsers = await User.find({
        dayOneNotificationSent: true,
        dayThreeNotificationSent: true,
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
          return await isInSevenToFifteenDays(
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

      console.log(
        "🚀 ~ file: notification.reminders.ts:62 ~ //schedule.scheduleJob ~ filteredUsersFCM:",
        filteredUsersFCM
      );

      var fcmTokensBelongedToUpdated = await User.updateMany(
        {
          fcmToken: filteredUsersFCM,
        },
        { $set: { daySevenNotificationSent: true } }
      );

      // console.log(
      //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
      //   fcmTokensBelongedToUpdated
      // );

      if (filteredUsersFCM.length > 0) {
        const notificationResponse = await admin.messaging().sendMulticast({
          tokens: filteredUsersFCM,
          notification: {
            title: `Clean slate is better always 🌞`,
            body: "Don't feel disheartened; as long as you keep trying, you're already succeeding.",
            // imageUrl: "https://www.habitune.net/image/empty-shell",
          },
        });
      }
    } catch (error) {
      Logger.error(error);
    }
  });
};
