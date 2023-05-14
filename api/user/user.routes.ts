import { Router } from "express";
import {
  callbackSignInWithGoogle,
  fetchCurrentUserProfile,
  fetchUserProfile,
  sendFriendship,
  deleteUser,
} from "./user.controllers";

import verifyToken from "../middlewares/verifyToken";

import passport from "passport";

const userRoutes = Router();

userRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

userRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  callbackSignInWithGoogle
);

userRoutes.get("/profile", verifyToken, fetchCurrentUserProfile);

userRoutes.get("/selectedUser/profile/:userID", verifyToken, fetchUserProfile);

userRoutes.post("/sendFriendshipRequest", verifyToken, sendFriendship);

userRoutes.delete("/delete/me", verifyToken, deleteUser);

export default userRoutes;
