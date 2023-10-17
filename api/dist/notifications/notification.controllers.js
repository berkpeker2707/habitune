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
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middlewares/logger"));
dotenv_1.default.config();
const admin = require("firebase-admin");
const notificationUpdateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_model_1.default.findOne({
            userID: req.user[0]._id,
        });
        if (notification.tokenID === "" ||
            notification.tokenID !== req.body.token) {
            yield notification.updateOne({ tokenID: req.body.token }).exec();
            res.status(200).json(notification);
        }
        else {
            res.status(200).json(notification);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.notificationUpdateToken = notificationUpdateToken;
const notificationSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const loggedInUser = await User.findById(req.user[0]._id);
        const notification = yield notification_model_1.default.findOne({
            userID: req.user[0]._id,
        });
        const notificationResponse = yield admin.messaging().sendMulticast({
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
    }
    catch (error) {
        console.log("error controller noti: ", error);
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.notificationSend = notificationSend;
