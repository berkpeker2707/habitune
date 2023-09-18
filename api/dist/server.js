"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//logger is winston, can log all and categorize all as you wish
// import Logger from "./middlewares/logger";
//morgan is for checking requests
const morganMiddleware_1 = __importDefault(require("./middlewares/morganMiddleware"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const habit_routes_1 = __importDefault(require("./habit/habit.routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 1111;
app.use(express_1.default.json());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, helmet_1.default)());
app.use(require("express-session")({
    secret: "Enter your secret key",
    resave: true,
    saveUninitialized: true,
}));
(0, db_1.default)();
app.listen(port, () => console.log(`Server running at port: ${port}`));
//test requests for winston and morgan
app.use(morganMiddleware_1.default);
// app.get("/logger", (_, res) => {
//   Logger.error("This is an error log");
//   Logger.warn("This is a warn log");
//   Logger.info("This is a info log");
//   Logger.http("This is a http log");
//   Logger.debug("This is a debug log");
//   res.send("Hello world");
// });
app.get("/privacy", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/view/privacy.html"));
});
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/view/index.html"));
});
//routing
app.use("/api/user", user_routes_1.default);
app.use("/api/habit", habit_routes_1.default);
exports.default = app;
