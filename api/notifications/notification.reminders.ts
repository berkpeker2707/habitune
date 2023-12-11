import User from "../user/user.model";
import dotenv from "dotenv";
import Logger from "../middlewares/logger";

import isInYesterday from "../middlewares/isInYesterday";
import isInThreeToFiveDays from "../middlewares/isInThreeToFiveDays";
import isInSevenToFifteenDays from "../middlewares/isInSevenToFifteenDays";
import isInThirtyToSixtyDays from "../middlewares/isInThirtyToSixtyDays";
import isInNinetyToThreeHundredDays from "../middlewares/isInNinetyToThreeHundredDays";

dotenv.config();

// const schedule = require("node-schedule");

const admin = require("firebase-admin");

export const notifyUser = async () => {
  try {
    await step1();
    await step2();
    await step3();
    await step4();
    await step5();
    await step6();

    Logger.info("notifyUser steps completed successfully");
  } catch (error) {
    Logger.error("Error in sequential steps:", error);
  }
};

const step1 = async () => {
  console.log("Step 1: Completed sequential step logic");
  await notifyUsersDaily();
};

const step2 = async () => {
  console.log("Step 2: Completed cron job logic");
  await notifyUsersThreeDaysLater();
};

const step3 = async () => {
  console.log("Step 3: Completed cron job logic");
  await notifyUsersSevenDaysLater();
};

const step4 = async () => {
  console.log("Step 4: Completed cron job logic");

  await notifyUsersSevenDaysLater();
};

const step5 = async () => {
  console.log("Step 5: Completed cron job logic");

  await notifyUsersThirtyDaysLater();
};

const step6 = async () => {
  console.log("Step 6: Completed cron job logic");

  await notifyUsersNinetyDaysLater();
};

export const notifyUsersDaily = async () => {
  // dayOneNotificationSent

  //every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //every 6 hours
  // schedule.scheduleJob("0 0 */6 * *", async () => {
  try {
    console.log("timer yesterday run");

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
      randomNotification[Math.floor(Math.random() * randomNotification.length)];

    if (filteredUsersFCM.length > 0) {
      const notificationResponse = await admin.messaging().sendMulticast({
        tokens: filteredUsersFCM,
        notification: {
          title: notificationContent?.title,
          body: notificationContent?.body,
          // imageUrl: "https://www.habitune.net/image/empty-shell",
        },
      });
      Logger.info(notificationResponse);
    }
  } catch (error) {
    Logger.error(error);
  }

  // });
};

export const notifyUsersThreeDaysLater = async () => {
  // dayThreeNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //every day at 12:00 AM
  // schedule.scheduleJob("0 0 * * *", async () => {
  //every 6 hours
  // schedule.scheduleJob("0 0 */6 * *", async () => {
  try {
    console.log("timer three days run");

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
      Logger.info(notificationResponse);
    }
  } catch (error) {
    Logger.error(error);
  }
  // });
};

export const notifyUsersSevenDaysLater = async () => {
  // daySevenNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //at 12:00 AM, every 5 days
  // schedule.scheduleJob("0 0 */5 * *", async () => {
  //every 6 hours
  // schedule.scheduleJob("0 0 */6 * *", async () => {
  try {
    console.log("timer seven days run");

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

    // console.log(
    //   "🚀 ~ file: notification.reminders.ts:62 ~ //schedule.scheduleJob ~ filteredUsersFCM:",
    //   filteredUsersFCM
    // );

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
      Logger.info(notificationResponse);
    }
  } catch (error) {
    Logger.error(error);
  }
  // });
};

export const notifyUsersThirtyDaysLater = async () => {
  // dayThirtyNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //at 12:00 AM, every 15 days
  // schedule.scheduleJob("0 0 */15 * *", async () => {
  //every 6 hours
  // schedule.scheduleJob("0 0 */6 * *", async () => {
  try {
    console.log("timer 30 days run");

    // This function will run every hour
    // var selectUsers = await User.find({}).select("lastHabitUpdated");
    var selectUsers = await User.find({
      dayOneNotificationSent: true,
      dayThreeNotificationSent: true,
      daySevenNotificationSent: true,
      dayThirtyNotificationSent: false,
      dayNinetyNotificationSent: false,
    }).select("lastHabitUpdated fcmToken");

    // console.log(
    //   "🚀 ~ file: notification.reminders.ts:30 ~ schedule.scheduleJob ~ selectUsers:",
    //   selectUsers
    // );

    const result: boolean[] = await Promise.all(
      selectUsers.map(async (selectUser) => {
        return await isInThirtyToSixtyDays(
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
      { $set: { dayThirtyNotificationSent: true } }
    );

    // console.log(
    //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
    //   fcmTokensBelongedToUpdated
    // );

    if (filteredUsersFCM.length > 0) {
      const notificationResponse = await admin.messaging().sendMulticast({
        tokens: filteredUsersFCM,
        notification: {
          title: `We Miss You! 🌈`,
          body: "It's been a while since we've seen you. Your journey is unique, and we'd love to continue supporting you. Whenever you're ready, your habits are here waiting. 💙",
          // imageUrl: "https://www.habitune.net/image/empty-shell",
        },
      });
      Logger.info(notificationResponse);
    }
  } catch (error) {
    Logger.error(error);
  }
  // });
};

export const notifyUsersNinetyDaysLater = async () => {
  // dayNinetyNotificationSent

  // every 10 seconds */10 * * * * *
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  //at 12:00 AM, every 90 days
  // schedule.scheduleJob("0 0 */90 * *", async () => {
  //every 6 hours
  // schedule.scheduleJob("0 0 */6 * *", async () => {
  try {
    console.log("timer 90 days run");

    // This function will run every hour
    // var selectUsers = await User.find({}).select("lastHabitUpdated");
    var selectUsers = await User.find({
      dayOneNotificationSent: true,
      dayThreeNotificationSent: true,
      daySevenNotificationSent: true,
      dayThirtyNotificationSent: true,
      dayNinetyNotificationSent: false,
    }).select("lastHabitUpdated fcmToken");

    // console.log(
    //   "🚀 ~ file: notification.reminders.ts:30 ~ schedule.scheduleJob ~ selectUsers:",
    //   selectUsers
    // );

    const result: boolean[] = await Promise.all(
      selectUsers.map(async (selectUser) => {
        return await isInNinetyToThreeHundredDays(
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
      { $set: { dayNinetyNotificationSent: true } }
    );

    // console.log(
    //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
    //   fcmTokensBelongedToUpdated
    // );

    if (filteredUsersFCM.length > 0) {
      const notificationResponse = await admin.messaging().sendMulticast({
        tokens: filteredUsersFCM,
        notification: {
          title: "A Welcome Back Beacon 🚀",
          body: "It's been an extended period, and we've missed your presence. Your habits, like old friends, eagerly await your return. Whenever you're ready, let's pick up where we left off on this journey together! 🌈",
          // imageUrl: "https://www.habitune.net/image/empty-shell",
        },
      });
      Logger.info(notificationResponse);
    }
  } catch (error) {
    Logger.error(error);
  }
  // });
};
