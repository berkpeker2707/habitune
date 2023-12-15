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
exports.deleteUser = exports.changeTheme = exports.sendFeedback = exports.updateCurrentUserImage = exports.sendFriendship = exports.fetchUserProfile = exports.fetchCurrentUserProfile = exports.signInController = exports.signInWithGoogleController = void 0;
const errors_util_1 = require("../utils/errors.util");
const user_model_1 = __importDefault(require("./user.model"));
const notification_model_1 = __importDefault(require("../notifications/notification.model"));
const habit_model_1 = __importDefault(require("../habit/habit.model"));
const jwt = require("jsonwebtoken");
const { cloudinaryUploadUserImg, cloudinaryDeleteUserImg, } = require("../middlewares/cloudinary");
// const path = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const bcrypt = require("bcrypt");
dotenv_1.default.config();
const signInWithGoogleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var userExists = yield user_model_1.default.exists({ email: req.body.email });
        if (userExists) {
            //update user picture starts
            var foundUser = yield user_model_1.default.findOne({ email: req.body.email });
            //delete old profile image if exists
            if ((foundUser && foundUser.image.length > 1) ||
                (foundUser && foundUser.image.includes("https://res.cloudinary.com"))) {
                yield cloudinaryDeleteUserImg(foundUser.image);
            }
            yield user_model_1.default.findOneAndUpdate({ email: req.body.email }, { image: req.body.picture });
            //update user picture ends
            var token = yield jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            logger_1.default.info(token);
            res.status(200).json(token);
        }
        else {
            const user = yield user_model_1.default.create({
                id: req.body.id,
                firstName: req.body.name,
                email: req.body.email,
                image: req.body.picture,
                fcmToken: "empty",
                userType: "standart",
                theme: "default",
            });
            yield user.save();
            var token = yield jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            logger_1.default.info(token);
            res.status(200).json(token);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.signInWithGoogleController = signInWithGoogleController;
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const emailRegex = new RegExp(
        //   "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
        // );
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!emailRegex.test(req.body.email)) {
            logger_1.default.error("Unacceptable email");
            res.status(500).send((0, errors_util_1.getErrorMessage)("Unacceptable email"));
        }
        else {
            var userExists = yield user_model_1.default.exists({ email: req.body.email });
            if (userExists) {
                const thatUser = yield user_model_1.default.findOne({ email: req.body.email });
                const result = yield bcrypt.compare(req.body.password, thatUser === null || thatUser === void 0 ? void 0 : thatUser.password);
                if (result) {
                    var foundUser = yield user_model_1.default.findOne({ email: req.body.email });
                    var token = yield jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                        expiresIn: "365d",
                    });
                    logger_1.default.info(token);
                    res.status(200).json(token);
                }
                else {
                    logger_1.default.error("Wrong password or email");
                    res.status(500).send((0, errors_util_1.getErrorMessage)("Wrong password or email"));
                }
            }
            else {
                if ((!req.body.id && req.body.id !== 0) ||
                    (!req.body.name && req.body.name === "") ||
                    (!req.body.email && req.body.email === "") ||
                    (!req.body.password && req.body.password === "")) {
                    logger_1.default.error("Need all required data");
                    res.status(500).send((0, errors_util_1.getErrorMessage)("Need all required data"));
                }
                else {
                    const user = yield user_model_1.default.create({
                        id: req.body.id,
                        firstName: req.body.name,
                        email: req.body.email,
                        image: "https://www.habitune.net/image/empty-shell",
                        password: yield bcrypt.hash(req.body.password, 10),
                        fcmToken: "empty",
                        userType: "standart",
                        theme: "default",
                    });
                    yield user.save();
                    var token = yield jwt.sign({ user: user }, process.env.JWT_SECRET, {
                        expiresIn: "365d",
                    });
                    logger_1.default.info(token);
                    res.status(200).json(token);
                }
            }
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.signInController = signInController;
const fetchCurrentUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var clientTime = parseInt(req.params.today);
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id)
            .populate({ path: "friends.friend", model: "User" })
            .populate({
            path: "habits",
            model: "Habit",
        })
            .exec();
        if (req.params.today) {
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $set: { lastLogin: clientTime },
            }));
        }
        logger_1.default.info(loggedinUser);
        res.status(200).json(loggedinUser);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
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
        logger_1.default.info(user);
        res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.fetchUserProfile = fetchUserProfile;
const sendFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userMail = req.body.userMail;
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id);
        if ((yield user_model_1.default.find({ email: userMail })).length < 1 ||
            userMail === req.user[0].email) {
            logger_1.default.error("Invalid Email");
            res.status(500).send((0, errors_util_1.getErrorMessage)("Invalid Email"));
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
            // console.log(
            //   "condition #1: only loggedinUser wants friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $push: {
                    friends: [{ friend: user[0]._id, pending: false, paired: false }],
                },
            }, { upsert: true }));
            yield ((_a = user[0]) === null || _a === void 0 ? void 0 : _a.updateOne({
                $push: {
                    friends: [
                        { friend: req.user[0]._id, pending: true, paired: false },
                    ],
                },
            }, { upsert: true }));
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else if (!currentUserHasPendingUserFriend &&
            currentUserAlreadyHasUserFriend &&
            targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser) {
            // console.log(
            //   "condition #2: currentUser has already added target user but still pending --- remove pending ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0]._id } },
            }, { multi: true }));
            yield ((_b = user[0]) === null || _b === void 0 ? void 0 : _b.updateOne({
                $pull: { friends: { friend: req.user[0]._id } },
            }, { multi: true }));
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else if (currentUserAlreadyHasUserFriend &&
            targetUserAlreadyHasCurrentUser) {
            // console.log(
            //   "condition #3: currentUser and target user has agreed friendship with --- break friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0]._id } },
            }, { multi: true }));
            yield ((_c = user[0]) === null || _c === void 0 ? void 0 : _c.updateOne({
                $pull: { friends: { friend: req.user[0]._id } },
            }, { multi: true }));
            // const loggedinUsersHabits = await Habit.find({ owner: req.user[0]._id })
            // await Habit.update(
            //   { owner: req.user[0]._id },
            //   { $pull: { sharedWith: user[0]._id } },
            // );
            yield habit_model_1.default.updateMany({ owner: req.user[0]._id }, { $pull: { sharedWith: user[0]._id } });
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else if (currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            targetUserAlreadyHasCurrentUser) {
            // console.log(
            //   "condition #4: target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
            // );
            yield user_model_1.default.findOneAndUpdate({
                _id: req.user[0]._id,
                friends: {
                    $elemMatch: { friend: user[0]._id, pending: true, paired: false },
                },
            }, {
                $set: { "friends.$.pending": false, "friends.$.paired": true },
            });
            yield user_model_1.default.findOneAndUpdate({
                _id: user[0]._id,
                friends: {
                    $elemMatch: {
                        friend: req.user[0]._id,
                        pending: false,
                        paired: false,
                    },
                },
            }, {
                $set: { "friends.$.pending": false, "friends.$.paired": true },
            });
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else {
            // console.log("target user know");
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.sendFriendship = sendFriendship;
const updateCurrentUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const localPath = (_e = (_d = req === null || req === void 0 ? void 0 : req.files) === null || _d === void 0 ? void 0 : _d.image) === null || _e === void 0 ? void 0 : _e.path;
        const imgUploaded = yield cloudinaryUploadUserImg(localPath, req.user[0]._id);
        const foundUserPicture = yield user_model_1.default.findById(req.user[0]._id);
        //delete old profile image if exists
        if ((foundUserPicture && foundUserPicture.image.length > 1) ||
            (foundUserPicture &&
                foundUserPicture.image.includes("https://res.cloudinary.com"))) {
            yield cloudinaryDeleteUserImg(foundUserPicture.image);
            const user = yield user_model_1.default.findByIdAndUpdate(req.user[0]._id, {
                image: imgUploaded.secure_url,
            }, { new: true });
            logger_1.default.info(user);
            res.status(200).json(user);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateCurrentUserImage = updateCurrentUserImage;
const sendFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        if (req.body.feedback.length < 501) {
            var feedback = req.body.feedback;
            const currentUser = yield user_model_1.default.findById((_f = req.user[0]) === null || _f === void 0 ? void 0 : _f._id);
            if (currentUser && currentUser.feedback.length >= 10) {
                logger_1.default.error("Feedback limit reached (10 items)");
                res
                    .status(500)
                    .send((0, errors_util_1.getErrorMessage)("Feedback limit reached (10 items)"));
            }
            const loggedinUser = yield user_model_1.default.findByIdAndUpdate((_g = req.user[0]) === null || _g === void 0 ? void 0 : _g._id, { $push: { feedback: feedback } }, { new: true });
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else {
            logger_1.default.error("Feedback limit 500 character reached");
            res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)("Feedback limit 500 character reached"));
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.sendFeedback = sendFeedback;
const changeTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        var newThemeValue = req.body.theme;
        const loggedinUser = yield user_model_1.default.findByIdAndUpdate((_h = req.user[0]) === null || _h === void 0 ? void 0 : _h._id, { $set: { theme: newThemeValue } }, { new: true });
        logger_1.default.info(loggedinUser);
        res.status(200).json(loggedinUser);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.changeTheme = changeTheme;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUser = yield user_model_1.default.findById(req.user[0]._id);
        if ((loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.habits.length) && loggedinUser.habits.length > 0) {
            for (let i = 0; i < loggedinUser.habits.length; i++) {
                yield habit_model_1.default.findOneAndDelete({
                    _id: loggedinUser.habits[i],
                });
            }
            if (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    console.log("first");
                    yield user_model_1.default.findOneAndUpdate({
                        _id: loggedinUser.friends[y].friend,
                    }, {
                        $pull: { friends: { friend: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id } },
                    });
                    console.log(loggedinUser.friends[y].friend);
                }
            }
            yield user_model_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            yield notification_model_1.default.findOneAndDelete({
                userID: req.user[0]._id,
            });
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
        else {
            console.log("No habit detected.");
            if (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    yield user_model_1.default.findOneAndUpdate({
                        _id: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends[y].friend,
                    }, {
                        $pull: { friends: { friend: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id } },
                    });
                }
            }
            yield user_model_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            yield notification_model_1.default.findOneAndDelete({
                userID: req.user[0]._id,
            });
            logger_1.default.info(loggedinUser);
            res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.deleteUser = deleteUser;
