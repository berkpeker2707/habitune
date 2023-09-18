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
exports.deleteUser = exports.sendFriendship = exports.fetchUserProfile = exports.fetchCurrentUserProfile = exports.signInWithGoogleController = void 0;
const errors_util_1 = require("../utils/errors.util");
const user_model_1 = __importDefault(require("./user.model"));
const habit_model_1 = __importDefault(require("../habit/habit.model"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middlewares/logger"));
dotenv_1.default.config();
const signInWithGoogleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        var foundUser = yield user_model_1.default.find({ email: req.body.email });
        console.log("🚀 ~ file: user.controllers.ts:20 ~ foundUser:", foundUser);
        if (foundUser) {
            var token = yield jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.status(200).json(token);
            // res.status(200).json(foundUser);
        }
        else {
            const user = yield user_model_1.default.create({
                id: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id,
                firstName: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.name,
                email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email,
                image: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.picture,
            });
            yield user.save();
            console.log("🚀 ~ file: user.controllers.ts:36 ~ user:", user);
            var token = yield jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.status(200).json(token);
            // res.status(200).json(user);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.signInWithGoogleController = signInWithGoogleController;
const fetchCurrentUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id)
            .populate({ path: "friends.friend", model: "User" })
            .populate({
            path: "habits",
            model: "Habit",
        })
            .exec();
        res.status(200).json(loggedinUser);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.fetchCurrentUserProfile = fetchCurrentUserProfile;
const fetchUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.userID;
        const user = yield user_model_1.default.findById(userID)
            .populate({ path: "friends.friend", model: "User" })
            .populate({
            path: "habits",
            model: "Habit",
        })
            .exec();
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.fetchUserProfile = fetchUserProfile;
const sendFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userMail = req.body.userMail;
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id);
        if ((yield user_model_1.default.find({ email: userMail })).length < 1 ||
            userMail === req.user[0].email) {
            return res.json({
                message: "Invalid Email.",
            });
        }
        const user = yield user_model_1.default.find({ email: userMail });
        // const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
        //   return element.friend.toString() == user[0]._id.toString();
        // });
        const currentUserAlreadyHasUserFriend = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends.some((element) => {
            return (element.friend.toString() == user[0]._id.toString() &&
                element.pending === false);
        });
        const currentUserHasPendingUserFriend = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends.some((element) => {
            return (element.friend.toString() == user[0]._id.toString() &&
                element.pending === true);
        });
        // const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
        //   return elemfriends.friend.toString() === req.user[0]._id.toString();
        // });
        const targetUserAlreadyHasCurrentUser = user[0].friends.some((elemfriends) => {
            return (elemfriends.friend.toString() === req.user[0]._id.toString() &&
                elemfriends.pending === false);
        });
        const targetUserHasPendingCurrentUser = user[0].friends.some((elemfriends) => {
            return (elemfriends.friend.toString() === req.user[0]._id.toString() &&
                elemfriends.pending === true);
        });
        if (!currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser) {
            // console.log("only loggedinUser wants friendship ///// DONE");
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $push: { friends: [{ friend: user[0]._id, pending: true }] },
            }, { upsert: true }));
            res.status(200).json(loggedinUser);
        }
        else if (currentUserHasPendingUserFriend) {
            // console.log(
            //   "currentUser has already added target user but still pending --- remove pending ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0]._id } },
            }, { multi: true }));
            res.status(200).json(loggedinUser);
        }
        else if (currentUserAlreadyHasUserFriend &&
            targetUserAlreadyHasCurrentUser) {
            // console.log(
            //   "currentUser and target user has agreed friendship with --- break friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0]._id } },
            }, { multi: true }));
            yield ((_e = user[0]) === null || _e === void 0 ? void 0 : _e.updateOne({
                $pull: { friends: { friend: req.user[0]._id } },
            }, { multi: true }));
            res.status(200).json(loggedinUser);
        }
        else if (targetUserHasPendingCurrentUser) {
            // console.log(
            //   "target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $push: { friends: [{ friend: user[0]._id, pending: false }] },
            }, { upsert: true }));
            yield user_model_1.default.findOneAndUpdate({
                friends: { $elemMatch: { friend: req.user[0]._id, pending: true } },
            }, {
                $set: { "friends.$.pending": false },
            });
            res.status(200).json(loggedinUser);
        }
        else {
            // console.log("target user know");
            res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.sendFriendship = sendFriendship;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id);
        if (loggedinUser &&
            loggedinUser.habits.length &&
            loggedinUser.habits.length > 0) {
            for (let i = 0; i < loggedinUser.habits.length; i++) {
                yield habit_model_1.default.findOneAndDelete({
                    _id: loggedinUser.habits[i],
                });
            }
            yield user_model_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            res.status(200).json(loggedinUser);
        }
        else {
            // console.log("No habit detected.");
            yield user_model_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.deleteUser = deleteUser;
