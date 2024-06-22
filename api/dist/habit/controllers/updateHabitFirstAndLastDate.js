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
exports.updateHabitFirstAndLastDate = void 0;
const errors_util_1 = require("../../utils/errors.util");
const habit_1 = __importDefault(require("../models/habit"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
dotenv_1.default.config();
const updateHabitFirstAndLastDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.lastDate > req.body.firstDate) {
            const selectedHabit = yield habit_1.default.findByIdAndUpdate(req.body._id, {
                $set: { firstDate: req.body.firstDate, lastDate: req.body.lastDate },
            }, { upsert: false, new: true })
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec();
            return res.status(200).json(selectedHabit);
        }
        else {
            logger_1.errorLogger.error(`User ${req.user[0]._id} last date cannot be earlier than first date`);
            return res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)('Last date cannot be earlier than first date'));
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitFirstAndLastDate = updateHabitFirstAndLastDate;
//# sourceMappingURL=updateHabitFirstAndLastDate.js.map