import { Router } from "express";
import {
  notificationUpdateToken,
  notificationSend,
} from "./notification.controllers";

import verifyToken from "../middlewares/verifyToken";
import defaultLimitter from "../middlewares/defaultLimitter";

const notificationRoutes = Router();

notificationRoutes.post(
  "/update/token",
  [verifyToken, defaultLimitter],
  notificationUpdateToken
);

notificationRoutes.put(
  "/update/push",
  [verifyToken, defaultLimitter],
  notificationSend
);

export default notificationRoutes;
