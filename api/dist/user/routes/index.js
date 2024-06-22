"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const defaultLimitter_1 = __importDefault(require("../../middlewares/defaultLimitter"));
const lowLimitter_1 = __importDefault(require("../../middlewares/lowLimitter"));
const userRoutes = (0, express_1.Router)();
userRoutes.post('/google', lowLimitter_1.default, index_1.signInWithGoogle);
userRoutes.post('/signin', lowLimitter_1.default, index_1.signIn);
userRoutes.get('/profile', [verifyToken_1.default, defaultLimitter_1.default], index_1.fetchCurrentUserProfile);
userRoutes.get('/selectedUser/profile/:userID', [verifyToken_1.default, defaultLimitter_1.default], index_1.fetchUserProfile);
userRoutes.post('/update/profile/image', [verifyToken_1.default, defaultLimitter_1.default], index_1.updateCurrentUserImage);
userRoutes.post('/update/feedback', [verifyToken_1.default, defaultLimitter_1.default], index_1.sendFeedback);
userRoutes.post('/sendFriendshipRequest', [verifyToken_1.default, defaultLimitter_1.default], index_1.sendFriendship);
userRoutes.post('/changeTheme', [verifyToken_1.default, defaultLimitter_1.default], index_1.changeTheme);
userRoutes.delete('/delete/me', [verifyToken_1.default, defaultLimitter_1.default], index_1.deleteUser);
exports.default = userRoutes;
//# sourceMappingURL=index.js.map