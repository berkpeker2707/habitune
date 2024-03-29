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
exports.updateHabitHidden = exports.updateHabitCompletedDate = exports.updateHabitDates = exports.updateHabitFirstAndLastDate = exports.updateHabitSharedWith = exports.updateHabitColor = exports.updateHabitName = exports.deleteHabit = exports.getSingleHabit = exports.getFriendHabitDatesDotsBoolean = exports.getFriendHabitWeekStreakBoolean = exports.getAllHabitDatesDotsBoolean = exports.getCurrentHabitWeekStreakBoolean = exports.getTodaysHabitsBoolean = exports.getTodaysHabits = exports.getAllHabitsOfSelectedUser = exports.getAllHabits = exports.createHabit = void 0;
const errors_util_1 = require("../utils/errors.util");
const habit_model_1 = __importDefault(require("./habit.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const notification_model_1 = __importDefault(require("../notifications/notification.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../middlewares/logger");
const calculateUpcomingDates_1 = __importDefault(require("../middlewares/calculateUpcomingDates"));
const isInCompletedDates_1 = __importDefault(require("../middlewares/isInCompletedDates"));
const isInArray_1 = __importDefault(require("../middlewares/isInArray"));
dotenv_1.default.config();
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_model_1.default.findById(req.user[0]._id);
        if (checkUser && checkUser.habits.length >= 20) {
            logger_1.errorLogger.error(`User ${req.user[0]._id} already has 20 habits`);
            res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)(`User ${req.user[0]._id} already has 20 habits`));
        }
        else {
            const newHabit = yield habit_model_1.default.create({
                owner: req.user[0]._id,
                name: req.body.name,
                color: req.body.color ? req.body.color : "#968EB0",
                sharedWith: req.body.friendList,
                firstDate: req.body.firstDate,
                lastDate: req.body.lastDate,
                dates: [],
                upcomingDates: [],
                isHidden: false,
            });
            yield user_model_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $push: { habits: [newHabit._id] },
            }, { upsert: true });
            var newHabitItem = yield newHabit
                .updateOne({
                $push: {
                    upcomingDates: [
                        ...(yield (0, calculateUpcomingDates_1.default)(req.body.firstDate, req.body.lastDate, req.body.upcomingDates
                            ? req.body.upcomingDates
                            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])),
                    ],
                },
            })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            // console.log("newHabitItem: ", newHabitItem);
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked createHabit`);
            res.status(200).json(newHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.createHabit = createHabit;
const getAllHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUsersHabits = yield habit_model_1.default.find({ owner: req.user[0]._id })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getAllHabits`);
        res.status(200).json(loggedinUsersHabits);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getAllHabits = getAllHabits;
const getAllHabitsOfSelectedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUsersHabits = yield habit_model_1.default.find({
            owner: req.params.id,
            isHidden: false,
        })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getAllHabitsOfSelectedUser`);
        res.status(200).json(loggedinUsersHabits);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getAllHabitsOfSelectedUser = getAllHabitsOfSelectedUser;
const getTodaysHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var clientTime = parseInt(req.params.today);
        //calculate the start and end timestamps for the current day
        const startOfToday = new Date(clientTime);
        startOfToday.setHours(0, 0, 0, 0); //set the time to 00:00:00.000
        const endOfToday = new Date(clientTime);
        endOfToday.setHours(23, 59, 59, 999); //set the time to 23:59:59.999
        const loggedinUsersTodayHabits = yield habit_model_1.default.find({
            owner: req.user[0]._id,
            upcomingDates: {
                $gte: startOfToday,
                $lte: endOfToday, //less than or equal to the end of the day
            },
        })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabits`);
        res.status(200).json(loggedinUsersTodayHabits);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getTodaysHabits = getTodaysHabits;
const getTodaysHabitsBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var clientTime = parseInt(req.params.today);
        const loggedinUsersTodayHabits = yield habit_model_1.default.find({
            owner: req.user[0]._id,
        })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        var todaysHabitBooleanData;
        todaysHabitBooleanData = loggedinUsersTodayHabits.map((allHabitsItem) => {
            return (0, isInCompletedDates_1.default)(allHabitsItem.dates, new Date(clientTime));
        });
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabitsBoolean`);
        res.status(200).json(todaysHabitBooleanData);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getTodaysHabitsBoolean = getTodaysHabitsBoolean;
const getCurrentHabitWeekStreakBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var clientTime = parseInt(req.params.today);
        const loggedinUsersTodayHabits = yield habit_model_1.default.find({
            owner: req.user[0]._id,
        })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        var currentHabitWeekStreakData;
        currentHabitWeekStreakData = loggedinUsersTodayHabits.map((allHabitsItem) => {
            if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 6, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 7;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 6;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 5;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 4;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 3;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 2;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 1;
            }
            else {
                return 0;
            }
        });
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getCurrentHabitWeekStreakBoolean`);
        res.status(200).json(currentHabitWeekStreakData);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getCurrentHabitWeekStreakBoolean = getCurrentHabitWeekStreakBoolean;
const getAllHabitDatesDotsBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var clientTime = parseInt(req.params.today);
    const loggedinUsersTodayHabits = yield habit_model_1.default.find({
        owner: req.user[0]._id,
    })
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();
    var allHabitDatesDotsData = [];
    for (var i = 0; i < loggedinUsersTodayHabits.length; i++) {
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(clientTime)));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 6, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
    }
    res.status(200).json(allHabitDatesDotsData);
});
exports.getAllHabitDatesDotsBoolean = getAllHabitDatesDotsBoolean;
const getFriendHabitWeekStreakBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var clientTime = parseInt(req.params.today);
        const loggedinUsersTodayHabits = yield habit_model_1.default.find({
            owner: req.params.friend,
        })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        var currentHabitWeekStreakData;
        currentHabitWeekStreakData = loggedinUsersTodayHabits.map((allHabitsItem) => {
            if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 6, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 7;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 6;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 5;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 4;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 3;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))) &&
                (0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 2;
            }
            else if ((0, isInArray_1.default)(allHabitsItem.dates, new Date(clientTime))) {
                return 1;
            }
            else {
                return 0;
            }
        });
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getCurrentHabitWeekStreakBoolean`);
        res.status(200).json(currentHabitWeekStreakData);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getFriendHabitWeekStreakBoolean = getFriendHabitWeekStreakBoolean;
const getFriendHabitDatesDotsBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var clientTime = parseInt(req.params.today);
    const loggedinUsersTodayHabits = yield habit_model_1.default.find({
        owner: req.params.friend,
    })
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();
    var allHabitDatesDotsData = [];
    for (var i = 0; i < loggedinUsersTodayHabits.length; i++) {
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(clientTime)));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 1, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 2, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 3, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 4, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 5, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
        allHabitDatesDotsData.push((0, isInArray_1.default)(loggedinUsersTodayHabits[i].dates, new Date(new Date(new Date(clientTime).getFullYear(), new Date(clientTime).getMonth(), new Date(clientTime).getDate() - 6, new Date(clientTime).getHours(), new Date(clientTime).getMinutes(), new Date(clientTime).getSeconds()))));
    }
    res.status(200).json(allHabitDatesDotsData);
});
exports.getFriendHabitDatesDotsBoolean = getFriendHabitDatesDotsBoolean;
const getSingleHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = req.body.selectedHabit;
        const loggedinUsersHabits = yield habit_model_1.default.findById(selectedHabit)
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked getSingleHabit`);
        res.status(200).json(loggedinUsersHabits);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getSingleHabit = getSingleHabit;
const deleteHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield habit_model_1.default.findOneAndDelete({
            _id: req.params.id,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
            $pull: { habits: req.params.id },
        }, { upsert: true });
        yield notification_model_1.default.deleteMany({
            habitID: req.params.id,
        });
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked deleteHabit`);
        res.status(200).json("Habit deleted");
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.deleteHabit = deleteHabit;
const updateHabitName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name.length > 0) {
            const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
                $set: { name: req.body.name },
            }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitName`);
            res.status(200).json(selectedHabit);
        }
        else {
            logger_1.errorLogger.error(`User ${req.user[0]._id} habit name is invalid`);
            res.status(500).send((0, errors_util_1.getErrorMessage)("Habit name is invalid"));
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitName = updateHabitName;
const updateHabitColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((req.body.color.length > 0 && req.body.color === "#968EB0") ||
            req.body.color === "#9DB2CE" ||
            req.body.color === "#C04F43" ||
            req.body.color === "#A5D2AC" ||
            req.body.color === "#99BB42" ||
            req.body.color === "#F59732" ||
            req.body.color === "#F1867E" ||
            req.body.color === "#FCCA1B" ||
            req.body.color === "#4D6691" ||
            req.body.color === "#6EA8D8" ||
            req.body.color === "#DEB4CF" ||
            req.body.color === "#F6AF90") {
            const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
                $set: { color: req.body.color },
            }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitColor`);
            res.status(200).json(selectedHabit);
        }
        else {
            logger_1.errorLogger.error(`User ${req.user[0]._id} habit color is invalid`);
            res.status(500).send((0, errors_util_1.getErrorMessage)("Habit color is invalid"));
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitColor = updateHabitColor;
const updateHabitSharedWith = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = yield habit_model_1.default.findById(req.body._id);
        const alreadySharedWith = selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.sharedWith.some((elemfriends) => {
            return elemfriends.toString() === req.body.userId.toString();
        });
        if (alreadySharedWith) {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $pull: { sharedWith: req.body.userId } }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitSharedWith`);
            res.status(200).json(updatedSelectedHabit);
        }
        else {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $push: { sharedWith: req.body.userId } }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitSharedWith`);
            res.status(200).json(updatedSelectedHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitSharedWith = updateHabitSharedWith;
const updateHabitFirstAndLastDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.lastDate > req.body.firstDate) {
            const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
                $set: { firstDate: req.body.firstDate, lastDate: req.body.lastDate },
            }, { upsert: false, new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitFirstAndLastDate`);
            res.status(200).json(selectedHabit);
        }
        else {
            logger_1.errorLogger.error(`User ${req.user[0]._id} last date cannot be earlier than first date`);
            res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)("Last date cannot be earlier than first date"));
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitFirstAndLastDate = updateHabitFirstAndLastDate;
const updateHabitDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = yield habit_model_1.default.findById(req.body._id);
        const dateExists = selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.dates.some((elemfriends) => {
            return elemfriends.getTime().toString() === req.body.date.toString();
        });
        if (dateExists) {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $pull: { dates: req.body.date } }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            // console.log(true);
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitDates`);
            res.status(200).json(updatedSelectedHabit);
        }
        else {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $push: { dates: req.body.date } }, { new: true })
                .populate({ path: "sharedWith", model: "User" })
                .slice("dates", -10) //last 10 numbers of the dates array
                .slice("upcomingDates", -10)
                .exec();
            // console.log(false);
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitDates`);
            res.status(200).json(updatedSelectedHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitDates = updateHabitDates;
const updateHabitCompletedDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var todayReq = new Date(req.body.date);
        var today = new Date(todayReq.getFullYear(), todayReq.getMonth(), todayReq.getDate(), todayReq.getHours(), todayReq.getMinutes(), todayReq.getSeconds());
        const habit = yield habit_model_1.default.findOne({ _id: req.body._id }, "dates").exec();
        if (!habit) {
            console.log("Habit not found.");
            return [];
        }
        //if todays date is in checked dates which is stored in dates field
        var isHabitIsInDates = yield (0, isInCompletedDates_1.default)(habit.dates, new Date(todayReq));
        const selectedHabit = yield habit_model_1.default.findById(req.body._id);
        //if it is already in dates, pull the date back, else push the date in
        if (!isHabitIsInDates) {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({ $push: { dates: today } }).populate({ path: "sharedWith", model: "User" }).slice("dates", -10).slice("upcomingDates", -10).exec());
            //update last habit updated date
            // await loggedinUser?.updateOne({
            //   $set: { lastHabitUpdated: todayReq },
            // });
            yield user_model_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $set: { lastHabitUpdated: todayReq },
            }, { upsert: true });
            //modify notification bools
            yield user_model_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $set: {
                    dayOneNotificationSent: false,
                    dayThreeNotificationSent: false,
                    daySevenNotificationSent: false,
                    dayThirtyNotificationSent: false,
                    dayNinetyNotificationSent: false,
                },
            }, { upsert: true });
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitCompletedDate`);
            res.status(200).json(selectedHabit);
        }
        else {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({
                $pop: { dates: 1 }, // Remove the last element from the 'dates' array
            }).populate({ path: "sharedWith", model: "User" }).slice("dates", -10).slice("upcomingDates", -10).exec());
            logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitCompletedDate`);
            res.status(200).json(selectedHabit);
        }
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitCompletedDate = updateHabitCompletedDate;
const updateHabitHidden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
            $set: { isHidden: req.body.hidden },
        }, { new: true })
            .populate({ path: "sharedWith", model: "User" })
            .slice("dates", -10) //last 10 numbers of the dates array
            .slice("upcomingDates", -10)
            .exec();
        logger_1.infoLogger.info(`User ${req.user[0]._id} invoked updateHabitHidden`);
        res.status(200).json(selectedHabit);
    }
    catch (error) {
        logger_1.errorLogger.error(error);
        res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitHidden = updateHabitHidden;
