"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
// import passport from "passport";
const userRoutes = (0, express_1.Router)();
// userRoutes.get("/google", [
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   }),
// ]);
// userRoutes.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   callbackSignInWithGoogle
// );
userRoutes.post("/google", user_controllers_1.signInWithGoogleController);
userRoutes.get("/profile", verifyToken_1.default, user_controllers_1.fetchCurrentUserProfile);
userRoutes.get("/selectedUser/profile/:userID", verifyToken_1.default, user_controllers_1.fetchUserProfile);
userRoutes.post("/sendFriendshipRequest", verifyToken_1.default, user_controllers_1.sendFriendship);
userRoutes.delete("/delete/me", verifyToken_1.default, user_controllers_1.deleteUser);
exports.default = userRoutes;
