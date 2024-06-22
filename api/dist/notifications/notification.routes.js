"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controllers_1 = require("./notification.controllers");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const defaultLimitter_1 = __importDefault(require("../middlewares/defaultLimitter"));
const notificationRoutes = (0, express_1.Router)();
notificationRoutes.post('/update/token', [verifyToken_1.default, defaultLimitter_1.default], notification_controllers_1.notificationUpdateToken);
notificationRoutes.post('/update/push', [verifyToken_1.default, defaultLimitter_1.default], notification_controllers_1.notificationSend);
exports.default = notificationRoutes;
//# sourceMappingURL=notification.routes.js.map