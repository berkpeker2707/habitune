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
exports.updateHabitCompletedDate = void 0;
const errors_util_1 = require("../../utils/errors.util");
const habit_1 = __importDefault(require("../models/habit"));
const user_1 = __importDefault(require("../../user/models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
const isInCompletedDates_1 = __importDefault(require("../../middlewares/isInCompletedDates"));
dotenv_1.default.config();
const updateHabitCompletedDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var todayReq = new Date(req.body.date);
        var today = new Date(todayReq.getFullYear(), todayReq.getMonth(), todayReq.getDate(), todayReq.getHours(), todayReq.getMinutes(), todayReq.getSeconds());
        const habit = yield habit_1.default.findOne({ _id: req.body._id }, 'dates').exec();
        if (!habit) {
            console.log('Habit not found.');
            return [];
        }
        //if todays date is in checked dates which is stored in dates field
        var isHabitIsInDates = yield (0, isInCompletedDates_1.default)(habit.dates, new Date(todayReq));
        const selectedHabit = yield habit_1.default.findById(req.body._id);
        //if it is already in dates, pull the date back, else push the date in
        if (!isHabitIsInDates) {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({ $push: { dates: today } }).populate({ path: 'sharedWith', model: 'User' }).slice('dates', -10).slice('upcomingDates', -10).exec());
            //update last habit updated date
            // await loggedinUser?.updateOne({
            //   $set: { lastHabitUpdated: todayReq },
            // });
            yield user_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $set: { lastHabitUpdated: todayReq },
            }, { upsert: true });
            //modify notification bools
            yield user_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $set: {
                    dayOneNotificationSent: false,
                    dayThreeNotificationSent: false,
                    daySevenNotificationSent: false,
                    dayThirtyNotificationSent: false,
                    dayNinetyNotificationSent: false,
                },
            }, { upsert: true });
            return res.status(200).json(selectedHabit);
        }
        else {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({
                $pop: { dates: 1 }, // Remove the last element from the 'dates' array
            }).populate({ path: 'sharedWith', model: 'User' }).slice('dates', -10).slice('upcomingDates', -10).exec());
            return res.status(200).json(selectedHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitCompletedDate = updateHabitCompletedDate;
//# sourceMappingURL=updateHabitCompletedDate.js.map