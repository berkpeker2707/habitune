import { Router } from "express";
import {
  callbackSignInWithGoogle,
  fetchCurrentUserProfile,
  fetchUserProfile,
  sendFriendship,
  confirmFriendship,
  removeFriend,
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

userRoutes.post("/confirmFriendshipRequest", verifyToken, confirmFriendship);

userRoutes.put("/cancelFriendship", verifyToken, removeFriend);

export default userRoutes;
