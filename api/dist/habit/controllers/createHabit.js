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
exports.createHabit = void 0;
const errors_util_1 = require("../../utils/errors.util");
const habit_1 = __importDefault(require("../models/habit"));
const user_1 = __importDefault(require("../../user/models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../../middlewares/logger");
const calculateUpcomingDates_1 = __importDefault(require("../../middlewares/calculateUpcomingDates"));
const { v4: uuidv4 } = require('uuid');
dotenv_1.default.config();
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findById(req.user[0]._id);
        if (checkUser && checkUser.habits.length >= 20) {
            logger_1.errorLogger.error(`User ${req.user[0]._id} already has 20 habits`);
            return res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)(`User ${req.user[0]._id} already has 20 habits`));
        }
        else {
            const newHabit = yield habit_1.default.create({
                id: uuidv4(),
                owner: req.user[0]._id,
                name: req.body.name,
                color: req.body.color ? req.body.color : '#968EB0',
                sharedWith: req.body.friendList,
                firstDate: req.body.firstDate,
                lastDate: req.body.lastDate,
                dates: [],
                upcomingDates: [],
                isHidden: false,
            });
            yield user_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $push: { habits: [newHabit._id] },
            }, { upsert: true });
            var newHabitItem = yield newHabit
                .updateOne({
                $push: {
                    upcomingDates: [
                        ...(yield (0, calculateUpcomingDates_1.default)(req.body.firstDate, req.body.lastDate, req.body.upcomingDates
                            ? req.body.upcomingDates
                            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])),
                    ],
                },
            })
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec();
            // console.log("newHabitItem: ", newHabitItem);
            return res.status(200).json(newHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.createHabit = createHabit;
//# sourceMappingURL=createHabit.js.map