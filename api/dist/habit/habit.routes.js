"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habit_controllers_1 = require("./habit.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const defaultLimitter_1 = __importDefault(require("../middlewares/defaultLimitter"));
const habitRoutes = (0, express_1.Router)();
habitRoutes.post("/new", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.createHabit);
habitRoutes.get("/all", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getAllHabits);
habitRoutes.get("/all/of/selected/user/:id", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getAllHabitsOfSelectedUser);
habitRoutes.get("/all/today/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getTodaysHabits);
habitRoutes.get("/home/boolean/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getTodaysHabitsBoolean);
habitRoutes.get("/overview/streak/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getCurrentHabitWeekStreakBoolean);
habitRoutes.get("/overview/dots/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getAllHabitDatesDotsBoolean);
habitRoutes.get("/friend/:friend/overview/streak/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getFriendHabitWeekStreakBoolean);
habitRoutes.get("/friend/:friend/overview/dots/:today", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getFriendHabitDatesDotsBoolean);
habitRoutes.get("/single", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.getSingleHabit);
habitRoutes.delete("/delete/:id", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.deleteHabit);
habitRoutes.put("/update/name", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitName);
habitRoutes.put("/update/color", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitColor);
habitRoutes.put("/update/share", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitSharedWith);
habitRoutes.put("/update/firstAndLastDate", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitFirstAndLastDate);
habitRoutes.put("/update/date", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitDates);
habitRoutes.put("/update/completed/date", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitCompletedDate);
habitRoutes.put("/update/hidden", [verifyToken_1.default, defaultLimitter_1.default], habit_controllers_1.updateHabitHidden);
exports.default = habitRoutes;
