import { Router } from "express";
import {
  signInWithGoogleController,
  fetchCurrentUserProfile,
  fetchUserProfile,
  sendFriendship,
  deleteUser,
} from "./user.controllers";

import verifyToken from "../middlewares/verifyToken";

const userRoutes = Router();

userRoutes.post("/google", signInWithGoogleController);

userRoutes.get("/profile", verifyToken, fetchCurrentUserProfile);

userRoutes.get("/selectedUser/profile/:userID", verifyToken, fetchUserProfile);

userRoutes.post("/sendFriendshipRequest", verifyToken, sendFriendship);

userRoutes.delete("/delete/me", verifyToken, deleteUser);

export default userRoutes;
