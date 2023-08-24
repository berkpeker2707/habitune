"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habit_controllers_1 = require("./habit.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const habitRoutes = (0, express_1.Router)();
habitRoutes.get("/new", verifyToken_1.default, habit_controllers_1.createHabit);
habitRoutes.get("/all", verifyToken_1.default, habit_controllers_1.getAllHabits);
habitRoutes.get("/single", verifyToken_1.default, habit_controllers_1.getSingleHabit);
habitRoutes.delete("/delete", verifyToken_1.default, habit_controllers_1.deleteHabit);
habitRoutes.put("/update/color", verifyToken_1.default, habit_controllers_1.updateHabitColor);
habitRoutes.put("/update/share", verifyToken_1.default, habit_controllers_1.updateHabitSharedWith);
habitRoutes.put("/update/firstAndLastDate", verifyToken_1.default, habit_controllers_1.updateHabitFirstAndLastDate);
habitRoutes.put("/update/date", verifyToken_1.default, habit_controllers_1.updateHabitDates);
habitRoutes.put("/update/completed/date", verifyToken_1.default, habit_controllers_1.updateHabitCompletedDate);
exports.default = habitRoutes;
