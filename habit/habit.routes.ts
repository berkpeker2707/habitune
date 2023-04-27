import { Router } from "express";
import { createHabit } from "./habit.controllers";

import verifyToken from "../middlewares/verifyToken";

const habitRoutes = Router();

habitRoutes.get("/new", verifyToken, createHabit);

export default habitRoutes;
