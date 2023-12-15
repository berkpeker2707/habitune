"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyUsersNinetyDaysLater = exports.notifyUsersThirtyDaysLater = exports.notifyUsersSevenDaysLater = exports.notifyUsersThreeDaysLater = exports.notifyUsersDaily = exports.notifyUser = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../middlewares/logger");
const isInYesterday_1 = __importDefault(require("../middlewares/isInYesterday"));
const isInThreeToFiveDays_1 = __importDefault(require("../middlewares/isInThreeToFiveDays"));
const isInSevenToFifteenDays_1 = __importDefault(require("../middlewares/isInSevenToFifteenDays"));
const isInThirtyToSixtyDays_1 = __importDefault(require("../middlewares/isInThirtyToSixtyDays"));
const isInNinetyToThreeHundredDays_1 = __importDefault(require("../middlewares/isInNinetyToThreeHundredDays"));
dotenv_1.default.config();
// const schedule = require("node-schedule");
const admin = require("firebase-admin");
const notifyUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield step1();
        yield step2();
        yield step3();
        yield step4();
        yield step5();
        yield step6();
        logger_1.warnLogger.info("notifyUser steps completed successfully");
    }
    catch (error) {
        logger_1.errorLogger.error("Error in sequential steps:", error);
    }
});
exports.notifyUser = notifyUser;
const step1 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 1: Completed sequential step logic");
    yield (0, exports.notifyUsersDaily)();
});
const step2 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 2: Completed cron job logic");
    yield (0, exports.notifyUsersThreeDaysLater)();
});
const step3 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 3: Completed cron job logic");
    yield (0, exports.notifyUsersSevenDaysLater)();
});
const step4 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 4: Completed cron job logic");
    yield (0, exports.notifyUsersSevenDaysLater)();
});
const step5 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 5: Completed cron job logic");
    yield (0, exports.notifyUsersThirtyDaysLater)();
});
const step6 = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Step 6: Completed cron job logic");
    yield (0, exports.notifyUsersNinetyDaysLater)();
});
const notifyUsersDaily = () => __awaiter(void 0, void 0, void 0, function* () {
    // dayOneNotificationSent
    //every 10 seconds */10 * * * * *
    // schedule.scheduleJob("*/10 * * * * *", async () => {
    //every 6 hours
    // schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
        logger_1.warnLogger.info("reminder notifyUsersDaily started");
        // This function will run every hour
        // var selectUsers = await User.find({}).select("lastHabitUpdated");
        var selectUsers = yield user_model_1.default.find({
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
        const result = yield Promise.all(selectUsers.map((selectUser) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, isInYesterday_1.default)([selectUser.lastHabitUpdated], new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())));
        })));
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
        var fcmTokensBelongedToUpdated = yield user_model_1.default.updateMany({
            fcmToken: filteredUsersFCM,
        }, { $set: { dayOneNotificationSent: true } });
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
        const notificationContent = randomNotification[Math.floor(Math.random() * randomNotification.length)];
        if (filteredUsersFCM.length > 0) {
            const notificationResponse = yield admin.messaging().sendMulticast({
                tokens: filteredUsersFCM,
                notification: {
                    title: notificationContent === null || notificationContent === void 0 ? void 0 : notificationContent.title,
                    body: notificationContent === null || notificationContent === void 0 ? void 0 : notificationContent.body,
                    // imageUrl: "https://www.habitune.net/image/empty-shell",
                },
            });
            logger_1.warnLogger.info("reminder notifyUsersDaily ended: ", notificationResponse);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
    // });
});
exports.notifyUsersDaily = notifyUsersDaily;
const notifyUsersThreeDaysLater = () => __awaiter(void 0, void 0, void 0, function* () {
    // dayThreeNotificationSent
    // every 10 seconds */10 * * * * *
    // schedule.scheduleJob("*/10 * * * * *", async () => {
    //every day at 12:00 AM
    // schedule.scheduleJob("0 0 * * *", async () => {
    //every 6 hours
    // schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
        logger_1.warnLogger.info("reminder notifyUsersThreeDaysLater started ");
        // This function will run every hour
        // var selectUsers = await User.find({}).select("lastHabitUpdated");
        var selectUsers = yield user_model_1.default.find({
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
        const result = yield Promise.all(selectUsers.map((selectUser) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, isInThreeToFiveDays_1.default)([selectUser.lastHabitUpdated], new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())));
        })));
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
        var fcmTokensBelongedToUpdated = yield user_model_1.default.updateMany({
            fcmToken: filteredUsersFCM,
        }, { $set: { dayThreeNotificationSent: true } });
        // console.log(
        //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
        //   fcmTokensBelongedToUpdated
        // );
        if (filteredUsersFCM.length > 0) {
            const notificationResponse = yield admin.messaging().sendMulticast({
                tokens: filteredUsersFCM,
                notification: {
                    title: `You can do this! ✊`,
                    body: "Building a habit takes 2 weeks to 3 months. Don't give up!",
                    // imageUrl: "https://www.habitune.net/image/empty-shell",
                },
            });
            logger_1.warnLogger.info("reminder notifyUsersThreeDaysLater ended: ", notificationResponse);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
    // });
});
exports.notifyUsersThreeDaysLater = notifyUsersThreeDaysLater;
const notifyUsersSevenDaysLater = () => __awaiter(void 0, void 0, void 0, function* () {
    // daySevenNotificationSent
    // every 10 seconds */10 * * * * *
    // schedule.scheduleJob("*/10 * * * * *", async () => {
    //at 12:00 AM, every 5 days
    // schedule.scheduleJob("0 0 */5 * *", async () => {
    //every 6 hours
    // schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
        logger_1.warnLogger.info("reminder notifyUsersSevenDaysLater started");
        // This function will run every hour
        // var selectUsers = await User.find({}).select("lastHabitUpdated");
        var selectUsers = yield user_model_1.default.find({
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
        const result = yield Promise.all(selectUsers.map((selectUser) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, isInSevenToFifteenDays_1.default)([selectUser.lastHabitUpdated], new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())));
        })));
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
        var fcmTokensBelongedToUpdated = yield user_model_1.default.updateMany({
            fcmToken: filteredUsersFCM,
        }, { $set: { daySevenNotificationSent: true } });
        // console.log(
        //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
        //   fcmTokensBelongedToUpdated
        // );
        if (filteredUsersFCM.length > 0) {
            const notificationResponse = yield admin.messaging().sendMulticast({
                tokens: filteredUsersFCM,
                notification: {
                    title: `Clean slate is better always 🌞`,
                    body: "Don't feel disheartened; as long as you keep trying, you're already succeeding.",
                    // imageUrl: "https://www.habitune.net/image/empty-shell",
                },
            });
            logger_1.warnLogger.info("reminder notifyUsersSevenDaysLater ended: ", notificationResponse);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
    // });
});
exports.notifyUsersSevenDaysLater = notifyUsersSevenDaysLater;
const notifyUsersThirtyDaysLater = () => __awaiter(void 0, void 0, void 0, function* () {
    // dayThirtyNotificationSent
    // every 10 seconds */10 * * * * *
    // schedule.scheduleJob("*/10 * * * * *", async () => {
    //at 12:00 AM, every 15 days
    // schedule.scheduleJob("0 0 */15 * *", async () => {
    //every 6 hours
    // schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
        logger_1.warnLogger.info("reminder notifyUsersThirtyDaysLater started");
        // This function will run every hour
        // var selectUsers = await User.find({}).select("lastHabitUpdated");
        var selectUsers = yield user_model_1.default.find({
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
        const result = yield Promise.all(selectUsers.map((selectUser) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, isInThirtyToSixtyDays_1.default)([selectUser.lastHabitUpdated], new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())));
        })));
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
        var fcmTokensBelongedToUpdated = yield user_model_1.default.updateMany({
            fcmToken: filteredUsersFCM,
        }, { $set: { dayThirtyNotificationSent: true } });
        // console.log(
        //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
        //   fcmTokensBelongedToUpdated
        // );
        if (filteredUsersFCM.length > 0) {
            const notificationResponse = yield admin.messaging().sendMulticast({
                tokens: filteredUsersFCM,
                notification: {
                    title: `We Miss You! 🌈`,
                    body: "It's been a while since we've seen you. Your journey is unique, and we'd love to continue supporting you. Whenever you're ready, your habits are here waiting. 💙",
                    // imageUrl: "https://www.habitune.net/image/empty-shell",
                },
            });
            logger_1.warnLogger.info("reminder notifyUsersThirtyDaysLater ended: ", notificationResponse);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
    // });
});
exports.notifyUsersThirtyDaysLater = notifyUsersThirtyDaysLater;
const notifyUsersNinetyDaysLater = () => __awaiter(void 0, void 0, void 0, function* () {
    // dayNinetyNotificationSent
    // every 10 seconds */10 * * * * *
    // schedule.scheduleJob("*/10 * * * * *", async () => {
    //at 12:00 AM, every 90 days
    // schedule.scheduleJob("0 0 */90 * *", async () => {
    //every 6 hours
    // schedule.scheduleJob("0 0 */6 * *", async () => {
    try {
        logger_1.warnLogger.info("reminder notifyUsersNinetyDaysLater started");
        // This function will run every hour
        // var selectUsers = await User.find({}).select("lastHabitUpdated");
        var selectUsers = yield user_model_1.default.find({
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
        const result = yield Promise.all(selectUsers.map((selectUser) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, isInNinetyToThreeHundredDays_1.default)([selectUser.lastHabitUpdated], new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())));
        })));
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
        var fcmTokensBelongedToUpdated = yield user_model_1.default.updateMany({
            fcmToken: filteredUsersFCM,
        }, { $set: { dayNinetyNotificationSent: true } });
        // console.log(
        //   "🚀 ~ file: notification.reminders.ts:71 ~ //schedule.scheduleJob ~ fcmTokensBelongedToUpdated:",
        //   fcmTokensBelongedToUpdated
        // );
        if (filteredUsersFCM.length > 0) {
            const notificationResponse = yield admin.messaging().sendMulticast({
                tokens: filteredUsersFCM,
                notification: {
                    title: "A Welcome Back Beacon 🚀",
                    body: "It's been an extended period, and we've missed your presence. Your habits, like old friends, eagerly await your return. Whenever you're ready, let's pick up where we left off on this journey together! 🌈",
                    // imageUrl: "https://www.habitune.net/image/empty-shell",
                },
            });
            logger_1.warnLogger.info("reminder notifyUsersNinetyDaysLater ended: ", notificationResponse);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
    // });
});
exports.notifyUsersNinetyDaysLater = notifyUsersNinetyDaysLater;
