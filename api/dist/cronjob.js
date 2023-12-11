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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./middlewares/logger"));
const notification_reminders_1 = require("./notifications/notification.reminders");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, notification_reminders_1.notifyUser)();
        logger_1.default.info("Cron job executed successfully");
        res.status(200).send("Cron job executed successfully");
    }
    catch (error) {
        logger_1.default.info("Error executing cron job");
        res.status(500).send("Internal Server Error");
    }
});
