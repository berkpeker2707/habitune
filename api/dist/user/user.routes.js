"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const defaultLimitter_1 = __importDefault(require("../middlewares/defaultLimitter"));
const lowLimitter_1 = __importDefault(require("../middlewares/lowLimitter"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("/google", lowLimitter_1.default, user_controllers_1.signInWithGoogleController);
userRoutes.post("/signin", lowLimitter_1.default, user_controllers_1.signInController);
userRoutes.get("/profile/:today", [verifyToken_1.default, defaultLimitter_1.default], user_controllers_1.fetchCurrentUserProfile);
userRoutes.get("/selectedUser/profile/:userID", [verifyToken_1.default, defaultLimitter_1.default], user_controllers_1.fetchUserProfile);
userRoutes.post("/sendFriendshipRequest", [verifyToken_1.default, defaultLimitter_1.default], user_controllers_1.sendFriendship);
userRoutes.delete("/delete/me", [verifyToken_1.default, defaultLimitter_1.default], user_controllers_1.deleteUser);
exports.default = userRoutes;
