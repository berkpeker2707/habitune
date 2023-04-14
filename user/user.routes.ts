import { Router } from "express";
import {
  signInWithGoogle,
  callbackSignInWithGoogle,
  fetchProfile,
} from "./user.controllers";

import verifyToken from "../middlewares/verifyToken";

import passport from "passport";

const userRoutes = Router();

userRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  signInWithGoogle
);

userRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  callbackSignInWithGoogle
);

// userRoutes.get("/auth/google/unauthorized", (req, res) => {
//   res.sendStatus(401);
// });

// userRoutes.get("/logout", (req, res) => {
//   //   req.logout();
//   req.session.destroy(() => res.redirect("/"));
// });

userRoutes.get(
  "/profile",
  //   passport.authenticate("jwt", { session: false }),
  verifyToken,
  fetchProfile
);

export default userRoutes;
