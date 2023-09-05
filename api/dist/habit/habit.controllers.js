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
exports.updateHabitCompletedDate = exports.updateHabitDates = exports.updateHabitFirstAndLastDate = exports.updateHabitSharedWith = exports.updateHabitColor = exports.updateHabitName = exports.deleteHabit = exports.getSingleHabit = exports.getTodaysHabits = exports.getAllHabits = exports.createHabit = void 0;
const errors_util_1 = require("../utils/errors.util");
const habit_model_1 = __importDefault(require("./habit.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const calculateUpcomingDates_1 = __importDefault(require("../middlewares/calculateUpcomingDates"));
dotenv_1.default.config();
const createHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const checkUser = yield user_model_1.default.findById(req.user[0]._id);
        if (checkUser && checkUser.habits && checkUser.habits.length >= 20) {
            logger_1.default.error("User already has 20 habits.");
            return res
                .status(500)
                .send((0, errors_util_1.getErrorMessage)("User already has 20 habits."));
        }
        else {
            var todayReq = new Date(Date.now());
            var today = new Date(todayReq.getFullYear(), todayReq.getMonth(), todayReq.getDate());
            var upComingDay = new Date(todayReq.getFullYear() + 1, todayReq.getMonth(), todayReq.getDate());
            const newHabit = yield habit_model_1.default.create({
                owner: req.user[0]._id,
                name: req.body.name,
                color: (_a = req.body.color) !== null && _a !== void 0 ? _a : "#968EB0",
                sharedWith: req.body.friendList,
                firstDate: req.body.firstDate ? req.body.firstDate : today,
                lastDate: req.body.lastDate ? req.body.lastDate : upComingDay,
                dates: [],
                upcomingDates: [],
            });
            yield user_model_1.default.findOneAndUpdate({ _id: req.user[0]._id }, {
                $push: { habits: [newHabit._id] },
            }, { upsert: true });
            yield newHabit.updateOne({
                $push: {
                    upcomingDates: [
                        ...(yield (0, calculateUpcomingDates_1.default)(req && req.body && req.body.firstDate
                            ? req.body.firstDate
                            : today, req && req.body && req.body.lastDate
                            ? req.body.lastDate
                            : upComingDay, req && req.body && req.body.upcomingDates
                            ? req.body.upcomingDates
                            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])),
                    ],
                },
            });
            res.status(200).json(newHabit);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.createHabit = createHabit;
const getAllHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedinUsersHabits = yield habit_model_1.default.find({ owner: req.user[0]._id });
        res.status(200).json(loggedinUsersHabits);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getAllHabits = getAllHabits;
const getTodaysHabits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todayTemp = new Date();
        const today = new Date(todayTemp.getFullYear(), todayTemp.getMonth(), todayTemp.getDate());
        const userTimezoneOffset = today.getTimezoneOffset() * 60000;
        const todayLocal = new Date(today.getTime() - userTimezoneOffset);
        const loggedinUsersTodayHabits = yield habit_model_1.default.find({
            owner: req.user[0]._id,
            upcomingDates: { $in: [todayLocal] },
        });
        res.status(200).json(loggedinUsersTodayHabits);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.getTodaysHabits = getTodaysHabits;
const getSingleHabit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = req.body.selectedHabit;
        const loggedinUsersHabits = yield habit_model_1.default.findById(selectedHabit);
        res.status(200).json(loggedinUsersHabits);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
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
        res.status(200).json("Habit deleted.");
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.deleteHabit = deleteHabit;
const updateHabitName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
            $set: { name: req.body.name },
        }, { new: true });
        res.status(200).json(selectedHabit);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitName = updateHabitName;
const updateHabitColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
            $set: { color: req.body.color },
        }, { new: true });
        res.status(200).json(selectedHabit);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
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
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $pull: { sharedWith: req.body.userId } }, { new: true });
            res.status(200).json(updatedSelectedHabit);
        }
        else {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $push: { sharedWith: req.body.userId } }, { new: true });
            res.status(200).json(updatedSelectedHabit);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitSharedWith = updateHabitSharedWith;
const updateHabitFirstAndLastDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.lastDate > req.body.firstDate) {
            const selectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, {
                $set: { firstDate: req.body.firstDate, lastDate: req.body.lastDate },
            }, { upsert: false, new: true });
            res.status(200).json(selectedHabit);
        }
        else {
            res.status(500).json("Last date cannot be earlier than first date.");
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
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
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $pull: { dates: req.body.date } }, { new: true });
            console.log(true);
            res.status(200).json(updatedSelectedHabit);
        }
        else {
            const updatedSelectedHabit = yield habit_model_1.default.findByIdAndUpdate(req.body._id, { $push: { dates: req.body.date } }, { new: true });
            console.log(false);
            res.status(200).json(updatedSelectedHabit);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitDates = updateHabitDates;
const updateHabitCompletedDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var todayReq = new Date(req.body.date);
        var today = new Date(todayReq.getFullYear(), todayReq.getMonth(), todayReq.getDate());
        function isInCompletedDates(array, value) {
            return !!(array === null || array === void 0 ? void 0 : array.find((item) => {
                return item.getTime() == value.getTime();
            }));
        }
        const selectedHabit = yield habit_model_1.default.findById(req.body._id);
        //if it is already in dates, pull the date back, else push the date in
        if (!isInCompletedDates(selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.dates, today)) {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({ $push: { dates: today } }));
            res.status(200).json(selectedHabit);
        }
        else {
            yield (selectedHabit === null || selectedHabit === void 0 ? void 0 : selectedHabit.updateOne({ $pull: { dates: today } }));
            res.status(200).json(selectedHabit);
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send((0, errors_util_1.getErrorMessage)(error));
    }
});
exports.updateHabitCompletedDate = updateHabitCompletedDate;
