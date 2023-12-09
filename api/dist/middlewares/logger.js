"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_mongodb_1 = __importDefault(require("winston-mongodb"));
// import path from "path";
const mongodbConnectionString = process.env.MONGODB_LOG_URI;
if (!mongodbConnectionString) {
    throw new Error("MongoDB connection string is not provided.");
}
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    // new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: path.join(__dirname, "..", "logs/error.log"),
    //   level: "error",
    // }),
    // new winston.transports.File({
    //   filename: path.join(__dirname, "..", "logs/warn.log"),
    //   level: "warn",
    // }),
    // new winston.transports.File({
    //   filename: path.join(__dirname, "..", "logs/info.log"),
    //   level: "info",
    // }),
    // new winston.transports.File({
    //   filename: path.join(__dirname, "..", "logs/http.log"),
    //   level: "http",
    // }),
    new winston_mongodb_1.default.MongoDB({
        db: mongodbConnectionString,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "error_logs",
        level: "error",
    }),
    new winston_mongodb_1.default.MongoDB({
        db: mongodbConnectionString,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "warn_logs",
        level: "warn",
    }),
    new winston_mongodb_1.default.MongoDB({
        db: mongodbConnectionString,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "info_logs",
        level: "info",
    }),
    new winston_mongodb_1.default.MongoDB({
        db: mongodbConnectionString,
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        collection: "http_logs",
        level: "http",
    }),
];
const Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    defaultMeta: { service: "user-service" },
    transports,
});
exports.default = Logger;
