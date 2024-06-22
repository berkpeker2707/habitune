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
exports.getAllHabitDatesDotsBoolean = void 0;
const habit_1 = __importDefault(require("../models/habit"));
const dotenv_1 = __importDefault(require("dotenv"));
const isInArray_1 = __importDefault(require("../../middlewares/isInArray"));
dotenv_1.default.config();
const getAllHabitDatesDotsBoolean = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var clientTime = parseInt(req.params.today);
    const loggedinUsersTodayHabits = yield habit_1.default.find({
        owner: req.user[0]._id,
    })
        .populate({ path: 'sharedWith', model: 'User' })
        .slice('dates', -10) //last 10 numbers of the dates array
        .slice('upcomingDates', -10)
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
    return res.status(200).json(allHabitDatesDotsData);
});
exports.getAllHabitDatesDotsBoolean = getAllHabitDatesDotsBoolean;
//# sourceMappingURL=getAllHabitDatesDotsBoolean.js.map