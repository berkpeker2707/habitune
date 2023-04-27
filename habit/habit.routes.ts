import { Router } from "express";
import { createHabit, deleteHabit } from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";

const habitRoutes = Router();

habitRoutes.get("/new", verifyToken, createHabit);

habitRoutes.delete("/delete", verifyToken, deleteHabit);

export default habitRoutes;
