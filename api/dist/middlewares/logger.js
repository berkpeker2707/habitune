"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnLogger = exports.errorLogger = exports.infoLogger = exports.httpLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_mongodb_1 = __importDefault(require("winston-mongodb"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './api/.env' });
const env = process.env.NODE_ENV || 'development';
const mongodbConnectionString = process.env.MONGODB_LOG_URI;
if (!mongodbConnectionString) {
    throw new Error('MongoDB connection string is not provided.');
}
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`));
const httpLogger = winston_1.default.createLogger({
    format,
    defaultMeta: { service: 'http-service' },
    transports: env === 'development'
        ? [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({
                filename: path_1.default.join(__dirname, '..', 'logs/http.log'),
                level: 'http',
            }),
        ]
        : [
            new winston_mongodb_1.default.MongoDB({
                db: mongodbConnectionString,
                options: { useNewUrlParser: true, useUnifiedTopology: true },
                collection: 'http_logs',
                level: 'http',
                tryReconnect: true,
            }),
        ],
});
exports.httpLogger = httpLogger;
const infoLogger = winston_1.default.createLogger({
    format,
    defaultMeta: { service: 'info-service' },
    transports: env === 'development'
        ? [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({
                filename: path_1.default.join(__dirname, '..', 'logs/info.log'),
                level: 'info',
            }),
        ]
        : [
            new winston_mongodb_1.default.MongoDB({
                db: mongodbConnectionString,
                options: { useNewUrlParser: true, useUnifiedTopology: true },
                collection: 'info_logs',
                level: 'info',
                tryReconnect: true,
            }),
        ],
});
exports.infoLogger = infoLogger;
const errorLogger = winston_1.default.createLogger({
    format,
    defaultMeta: { service: 'error-service' },
    transports: env === 'development'
        ? [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({
                filename: path_1.default.join(__dirname, '..', 'logs/error.log'),
                level: 'error',
            }),
        ]
        : [
            new winston_mongodb_1.default.MongoDB({
                db: mongodbConnectionString,
                options: { useNewUrlParser: true, useUnifiedTopology: true },
                collection: 'error_logs',
                level: 'error',
                tryReconnect: true,
            }),
        ],
});
exports.errorLogger = errorLogger;
const warnLogger = winston_1.default.createLogger({
    format,
    defaultMeta: { service: 'warn-service' },
    transports: env === 'development'
        ? [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({
                filename: path_1.default.join(__dirname, '..', 'logs/warn.log'),
                level: 'warn',
            }),
        ]
        : [
            new winston_mongodb_1.default.MongoDB({
                db: mongodbConnectionString,
                options: { useNewUrlParser: true, useUnifiedTopology: true },
                collection: 'warn_logs',
                level: 'warn',
                tryReconnect: true,
            }),
        ],
});
exports.warnLogger = warnLogger;
//# sourceMappingURL=logger.js.map