import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  updateHabitColor,
  updateHabitSharedWith,
  updateHabitFirstAndLastDate,
  updateHabitDates,
} from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";

const habitRoutes = Router();

habitRoutes.get("/new", verifyToken, createHabit);

habitRoutes.delete("/delete", verifyToken, deleteHabit);

habitRoutes.put("/update/color", verifyToken, updateHabitColor);

habitRoutes.put("/update/share", verifyToken, updateHabitSharedWith);

habitRoutes.put(
  "/update/firstAndLastDate",
  verifyToken,
  updateHabitFirstAndLastDate
);

habitRoutes.put("/update/date", verifyToken, updateHabitDates);

export default habitRoutes;
