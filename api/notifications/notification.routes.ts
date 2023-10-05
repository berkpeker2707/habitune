import { Router } from "express";
import { notificationPush } from "./notification.controllers";

import verifyToken from "../middlewares/verifyToken";

const notificationRoutes = Router();

notificationRoutes.put(
  "/notification/push/test",
  verifyToken,
  notificationPush
);

export default notificationRoutes;
