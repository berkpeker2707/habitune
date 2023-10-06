import { Router } from "express";
import {
  notificationUpdateToken,
  notificationSend,
} from "./notification.controllers";

import verifyToken from "../middlewares/verifyToken";

const notificationRoutes = Router();

notificationRoutes.post(
  "/notification/update/token",
  verifyToken,
  notificationUpdateToken
);

notificationRoutes.put(
  "/notification/update/push",
  verifyToken,
  notificationSend
);

export default notificationRoutes;
