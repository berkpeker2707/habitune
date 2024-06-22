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
exports.sendFriendship = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const habit_1 = __importDefault(require("../../habit/models/habit"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const sendFriendship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userMail = req.body.userMail;
        const loggedinUser = yield user_1.default.findById(req.user[0].id);
        if ((yield user_1.default.find({ email: userMail })).length < 1 ||
            userMail === req.user[0].email) {
            logger_1.errorLogger.error(`Invalid Email: ${req.body.userMail}`);
            return res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)(`Invalid Email: ${req.body.userMail}`));
        }
        const user = yield user_1.default.find({ email: userMail });
        // const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
        //   return element.friend.toString() == user[0].id.toString();
        // });
        const currentUserAlreadyHasUserFriend = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends.some(element => {
            return (element.friend.toString() == user[0].id.toString() &&
                element.pending === false);
        });
        const currentUserHasPendingUserFriend = loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends.some(element => {
            return (element.friend.toString() == user[0].id.toString() &&
                element.pending === true);
        });
        // const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
        //   return elemfriends.friend.toString() === req.user[0].id.toString();
        // });
        const targetUserAlreadyHasCurrentUser = user[0].friends.some(elemfriends => {
            return (elemfriends.friend.toString() === req.user[0].id.toString() &&
                elemfriends.pending === false);
        });
        const targetUserHasPendingCurrentUser = user[0].friends.some(elemfriends => {
            return (elemfriends.friend.toString() === req.user[0].id.toString() &&
                elemfriends.pending === true);
        });
        if (!currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser) {
            // console.log(
            //     "condition #1: only loggedinUser wants friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $push: {
                    friends: [{ friend: user[0].id, pending: false, paired: false }],
                },
            }, { upsert: true }));
            yield ((_a = user[0]) === null || _a === void 0 ? void 0 : _a.updateOne({
                $push: {
                    friends: [{ friend: req.user[0].id, pending: true, paired: false }],
                },
            }, { upsert: true }));
            return res.status(200).json(loggedinUser);
        }
        else if (!currentUserHasPendingUserFriend &&
            currentUserAlreadyHasUserFriend &&
            targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser) {
            // console.log(
            //     "condition #2: currentUser has already added target user but still pending --- remove pending ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0].id } },
            }, { multi: true }));
            yield ((_b = user[0]) === null || _b === void 0 ? void 0 : _b.updateOne({
                $pull: { friends: { friend: req.user[0].id } },
            }, { multi: true }));
            return res.status(200).json(loggedinUser);
        }
        else if (currentUserAlreadyHasUserFriend &&
            targetUserAlreadyHasCurrentUser) {
            // console.log(
            //     "condition #3: currentUser and target user has agreed friendship with --- break friendship ///// DONE"
            // );
            yield (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.updateOne({
                $pull: { friends: { friend: user[0].id } },
            }, { multi: true }));
            yield ((_c = user[0]) === null || _c === void 0 ? void 0 : _c.updateOne({
                $pull: { friends: { friend: req.user[0].id } },
            }, { multi: true }));
            // const loggedinUsersHabits = await Habit.find({ owner: req.user[0].id })
            // await Habit.update(
            //   { owner: req.user[0].id },
            //   { $pull: { sharedWith: user[0].id } },
            // );
            yield habit_1.default.updateMany({ owner: req.user[0].id }, { $pull: { sharedWith: user[0].id } });
            return res.status(200).json(loggedinUser);
        }
        else if (currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            targetUserAlreadyHasCurrentUser) {
            // console.log(
            //     "condition #4: target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
            // );
            yield user_1.default.findOneAndUpdate({
                _id: req.user[0].id,
                friends: {
                    $elemMatch: { friend: user[0].id, pending: true, paired: false },
                },
            }, {
                $set: { 'friends.$.pending': false, 'friends.$.paired': true },
            });
            yield user_1.default.findOneAndUpdate({
                _id: user[0].id,
                friends: {
                    $elemMatch: {
                        friend: req.user[0].id,
                        pending: false,
                        paired: false,
                    },
                },
            }, {
                $set: { 'friends.$.pending': false, 'friends.$.paired': true },
            });
            return res.status(200).json(loggedinUser);
        }
        else {
            console.log('target user know');
            return res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.sendFriendship = sendFriendship;
//# sourceMappingURL=sendFriendship.js.map