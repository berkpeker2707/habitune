import { Router } from "express";
import { createHabit, deleteHabit, editHabit } from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";

const habitRoutes = Router();

habitRoutes.get("/new", verifyToken, createHabit);

habitRoutes.delete("/delete", verifyToken, deleteHabit);

habitRoutes.put("/edit", verifyToken, editHabit);

export default habitRoutes;
