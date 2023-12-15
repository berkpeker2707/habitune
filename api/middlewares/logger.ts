import winston from "winston";
import winston_db from "winston-mongodb";
import path from "path";
const env = process.env.NODE_ENV || "development";

// const mongodbConnectionString = process.env.MONGODB_LOG_URI;
const mongodbConnectionString = process.env.MONGODB_URI;

if (!mongodbConnectionString) {
  throw new Error("MongoDB connection string is not provided.");
}

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const httpLogger = winston.createLogger({
  format,
  defaultMeta: { service: "http-service" },
  transports:
    env === "development"
      ? [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: path.join(__dirname, "..", "logs/http.log"),
            level: "http",
          }),
        ]
      : [
          new winston_db.MongoDB({
            db: mongodbConnectionString,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            collection: "http_logs",
            level: "http",
            tryReconnect: true,
          }),
        ],
});

const infoLogger = winston.createLogger({
  format,
  defaultMeta: { service: "info-service" },
  transports:
    env === "development"
      ? [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: path.join(__dirname, "..", "logs/info.log"),
            level: "info",
          }),
        ]
      : [
          new winston_db.MongoDB({
            db: mongodbConnectionString,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            collection: "info_logs",
            level: "info",
            tryReconnect: true,
          }),
        ],
});

const errorLogger = winston.createLogger({
  format,
  defaultMeta: { service: "error-service" },
  transports:
    env === "development"
      ? [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: path.join(__dirname, "..", "logs/error.log"),
            level: "error",
          }),
        ]
      : [
          new winston_db.MongoDB({
            db: mongodbConnectionString,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            collection: "error_logs",
            level: "error",
            tryReconnect: true,
          }),
        ],
});

const warnLogger = winston.createLogger({
  format,
  defaultMeta: { service: "warn-service" },
  transports:
    env === "development"
      ? [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: path.join(__dirname, "..", "logs/warn.log"),
            level: "warn",
          }),
        ]
      : [
          new winston_db.MongoDB({
            db: mongodbConnectionString,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            collection: "warn_logs",
            level: "warn",
            tryReconnect: true,
          }),
        ],
});

export { httpLogger, infoLogger, errorLogger, warnLogger };
