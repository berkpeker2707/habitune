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
exports.notificationSend = exports.notificationUpdateToken = void 0;
const errors_util_1 = require("../utils/errors.util");
const notification_model_1 = __importDefault(require("./notification.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middlewares/logger"));
dotenv_1.default.config();
const admin = require("firebase-admin");
const notificationUpdateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.user[0]._id, {
            fcmToken: req.body.token,
        });
        logger_1.default.info(updatedUser);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.notificationUpdateToken = notificationUpdateToken;
const notificationSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const notification = await Notification.findOne({
        //   userID: req.user[0]._id,
        // });
        const notification = yield notification_model_1.default.create({
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
        const randomBody = randomBodies[Math.floor(Math.random() * randomBodies.length)];
        const notificationResponse = yield admin.messaging().sendMulticast({
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
        logger_1.default.info(notification);
        res.status(200).json(notification);
    }
    catch (error) {
        // console.log("error controller noti: ", error);
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.notificationSend = notificationSend;
