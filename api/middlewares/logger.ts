import winston from "winston";
import winston_db from "winston-mongodb";
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

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

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
  new winston_db.MongoDB({
    db: mongodbConnectionString,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "error_logs",
    level: "error",
  }),

  new winston_db.MongoDB({
    db: mongodbConnectionString,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "warn_logs",
    level: "warn",
  }),
  new winston_db.MongoDB({
    db: mongodbConnectionString,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "info_logs",
    level: "info",
  }),
  new winston_db.MongoDB({
    db: mongodbConnectionString,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    collection: "http_logs",
    level: "http",
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  defaultMeta: { service: "user-service" },
  transports,
});

export default Logger;
