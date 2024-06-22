"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const mongoose_1 = __importStar(require("mongoose"));
const notificationSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        ref: 'User',
        // unique: true,
        // index: true,
    },
    habitID: {
        type: String,
        ref: 'Habit',
        // unique: true,
        // index: true,
    },
    notificationTitle: {
        type: String,
    },
    notificationBody: {
        type: String,
    },
    notificationImageUrl: {
        type: String,
    },
    notificationFriend: {
        type: Array,
    },
    notificationFriendImage: {
        type: Array,
    },
    notificationFirstName: {
        type: String,
    },
    notificationHabitName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        // default: () => new Date(Date.now() + 1 * 60 * 1000), //1 minutes in milliseconds
        default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        index: { expires: '5m' }, //create a TTL (Time-To-Live) index, where documents expire after 5 minute
    },
});
module.exports = mongoose_1.default.model('Notification', notificationSchema);
//# sourceMappingURL=notification.model.js.map