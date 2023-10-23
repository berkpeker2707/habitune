import { Router } from "express";
import {
  createHabit,
  getAllHabits,
  getAllHabitsOfSelectedUser,
  getTodaysHabits,
  getSingleHabit,
  deleteHabit,
  updateHabitName,
  updateHabitColor,
  updateHabitSharedWith,
  updateHabitFirstAndLastDate,
  updateHabitDates,
  updateHabitCompletedDate,
} from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";

const habitRoutes = Router();

habitRoutes.post("/new", verifyToken, createHabit);

habitRoutes.get("/all", verifyToken, getAllHabits);

habitRoutes.get(
  "/all/of/selected/user/:id",
  verifyToken,
  getAllHabitsOfSelectedUser
);

habitRoutes.get("/all/today", verifyToken, getTodaysHabits);

habitRoutes.get("/single", verifyToken, getSingleHabit);

habitRoutes.delete("/delete/:id", verifyToken, deleteHabit);

habitRoutes.put("/update/name", verifyToken, updateHabitName);

habitRoutes.put("/update/color", verifyToken, updateHabitColor);

habitRoutes.put("/update/share", verifyToken, updateHabitSharedWith);

habitRoutes.put(
  "/update/firstAndLastDate",
  verifyToken,
  updateHabitFirstAndLastDate
);

habitRoutes.put("/update/date", verifyToken, updateHabitDates);

habitRoutes.put(
  "/update/completed/date",
  verifyToken,
  updateHabitCompletedDate
);

export default habitRoutes;
