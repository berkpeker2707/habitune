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
exports.deleteUser = void 0;
const errors_util_1 = require("../../utils/errors.util");
const user_1 = __importDefault(require("../models/user"));
const notification_model_1 = __importDefault(require("../../notifications/notification.model"));
const habit_1 = __importDefault(require("../../habit/models/habit"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUser = yield user_1.default.findById(req.user[0]._id);
        if ((loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.habits.length) && loggedinUser.habits.length > 0) {
            for (let i = 0; i < loggedinUser.habits.length; i++) {
                yield habit_1.default.findOneAndDelete({
                    _id: loggedinUser.habits[i],
                });
            }
            if (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    yield user_1.default.findOneAndUpdate({
                        _id: loggedinUser.friends[y].friend,
                    }, {
                        $pull: { friends: { friend: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id } },
                    });
                }
            }
            yield user_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            yield notification_model_1.default.findOneAndDelete({
                userID: req.user[0]._id,
            });
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked deleteUser`);
            return res.status(200).json(loggedinUser);
        }
        else {
            // console.log("No habit detected.");
            if (loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    yield user_1.default.findOneAndUpdate({
                        _id: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser.friends[y].friend,
                    }, {
                        $pull: { friends: { friend: loggedinUser === null || loggedinUser === void 0 ? void 0 : loggedinUser._id } },
                    });
                }
            }
            yield user_1.default.findOneAndDelete({
                _id: req.user[0]._id,
            });
            yield notification_model_1.default.findOneAndDelete({
                userID: req.user[0]._id,
            });
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked deleteUser`);
            return res.status(200).json(loggedinUser);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map