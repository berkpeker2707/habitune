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
  updateHabitHidden,
} from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";
import defaultLimitter from "../middlewares/defaultLimitter";

const habitRoutes = Router();

habitRoutes.post("/new", [verifyToken, defaultLimitter], createHabit);

habitRoutes.get("/all", [verifyToken, defaultLimitter], getAllHabits);

habitRoutes.get(
  "/all/of/selected/user/:id",
  [verifyToken, defaultLimitter],
  getAllHabitsOfSelectedUser
);

habitRoutes.get(
  "/all/today/:today",
  [verifyToken, defaultLimitter],
  getTodaysHabits
);

habitRoutes.get("/single", [verifyToken, defaultLimitter], getSingleHabit);

habitRoutes.delete("/delete/:id", [verifyToken, defaultLimitter], deleteHabit);

habitRoutes.put(
  "/update/name",
  [verifyToken, defaultLimitter],
  updateHabitName
);

habitRoutes.put(
  "/update/color",
  [verifyToken, defaultLimitter],
  updateHabitColor
);

habitRoutes.put(
  "/update/share",
  [verifyToken, defaultLimitter],
  updateHabitSharedWith
);

habitRoutes.put(
  "/update/firstAndLastDate",
  [verifyToken, defaultLimitter],
  updateHabitFirstAndLastDate
);

habitRoutes.put(
  "/update/date",
  [verifyToken, defaultLimitter],
  updateHabitDates
);

habitRoutes.put(
  "/update/completed/date",
  [verifyToken, defaultLimitter],
  updateHabitCompletedDate
);

habitRoutes.put(
  "/update/hidden",
  [verifyToken, defaultLimitter],
  updateHabitHidden
);

export default habitRoutes;
