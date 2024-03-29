"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./logger");
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => logger_1.httpLogger.http(message),
};
// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
// const skip = () => {
//   const env = process.env.NODE_ENV || "development";
//   return env !== "development";
// };
// Build the morgan middleware
const morganMiddleware = (0, morgan_1.default)(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
// ":remote-addr :method :url :status :res[content-length] - :response-time ms",
":remote-addr - :remote-user [:date] :method :url HTTP/:http-version :status :res[content-length]", 
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
{
    stream,
    // skip,
});
exports.default = morganMiddleware;
