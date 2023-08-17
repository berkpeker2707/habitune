"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const passport_1 = __importDefault(require("passport"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/google", [
    passport_1.default.authenticate("google", {
        scope: ["email", "profile"],
    }),
]);
userRoutes.get("/google/callback", passport_1.default.authenticate("google", { session: false }), user_controllers_1.callbackSignInWithGoogle);
userRoutes.get("/google/callback?code4*", user_controllers_1.redirectToSignedInPage);
userRoutes.get("/profile", verifyToken_1.default, user_controllers_1.fetchCurrentUserProfile);
userRoutes.get("/selectedUser/profile/:userID", verifyToken_1.default, user_controllers_1.fetchUserProfile);
userRoutes.post("/sendFriendshipRequest", verifyToken_1.default, user_controllers_1.sendFriendship);
userRoutes.delete("/delete/me", verifyToken_1.default, user_controllers_1.deleteUser);
exports.default = userRoutes;
