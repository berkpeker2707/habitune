"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronjob = void 0;
const notification_reminders_1 = require("./notifications/notification.reminders");
const cronjob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, notification_reminders_1.notifyUser)();
        console.log("Cron job executed successfully");
        res.status(200).send("Cron job executed successfully");
    }
    catch (error) {
        console.log("Error executing cron job");
        res.status(500).send("Internal Server Error");
    }
});
exports.cronjob = cronjob;
