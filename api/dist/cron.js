"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_reminders_1 = require("./notifications/notification.reminders");
function handler(req, res) {
    (0, notification_reminders_1.notifyUser)();
    res.status(200).end("Hello Cron!");
}
exports.default = handler;
