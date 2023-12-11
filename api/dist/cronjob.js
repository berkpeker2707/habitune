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
const notification_reminders_1 = require("./notifications/notification.reminders");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, notification_reminders_1.notifyUser)();
        res.status(200).send("Cron job executed successfully");
    }
    catch (error) {
        console.error("Error executing cron job:", error);
        res.status(500).send("Internal Server Error");
    }
});
