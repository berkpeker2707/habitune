"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//logger is winston, can log all and categorize all as you wish
// import Logger from "./middlewares/logger";
const logger_1 = __importDefault(require("./middlewares/logger"));
//morgan is for checking requests
const morganMiddleware_1 = __importDefault(require("./middlewares/morganMiddleware"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const habit_routes_1 = __importDefault(require("./habit/habit.routes"));
const notification_routes_1 = __importDefault(require("./notifications/notification.routes"));
const notification_reminders_1 = require("./notifications/notification.reminders");
const path_1 = __importDefault(require("path"));
const lowLimitter_1 = __importDefault(require("./middlewares/lowLimitter"));
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
// app.use(lowLimitter);
app.use((req, res, next) => {
    //defined speific rate limitters for routes below
    //also defined lowLimitter as default for all except below
    if (req.path.startsWith("/api/user") ||
        req.path.startsWith("/api/habit") ||
        req.path.startsWith("/api/notification")) {
        // Skip limiter for /api/user, /api/habit, /api/notification and their sub-routes
        next();
    }
    else {
        (0, lowLimitter_1.default)(req, res, next);
    }
});
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
const key = (_a = process.env.FIREBASE_ADMINSDK_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/Ö/g, "").replace(/\\n/g, "\n");
var admin = require("firebase-admin");
var habitune_395006_firebase_adminsdk_yxw8e_3842870d9c = {
    type: process.env.FIREBASE_ADMINSDK_TYPE,
    project_id: process.env.FIREBASE_ADMINSDK_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMINSDK_PRIVATE_KEY_ID,
    private_key: key,
    client_email: process.env.FIREBASE_ADMINSDK_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMINSDK_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMINSDK_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMINSDK_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMINSDK_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMINSDK_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_ADMINSDK_UNIVERSE_DOMAIN,
};
admin.initializeApp({
    credential: admin.credential.cert(habitune_395006_firebase_adminsdk_yxw8e_3842870d9c),
});
app.get("/privacy", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/view/privacy.html"));
});
app.get("/image/empty-shell", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/public/images/empty-shell.png"));
});
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/view/index.html"));
});
//routing
app.use("/api/user", user_routes_1.default);
app.use("/api/habit", habit_routes_1.default);
app.use("/api/notification", notification_routes_1.default);
//reminders
try {
    // yesterday reminder
    (0, notification_reminders_1.notifyUsersDaily)();
    //three days later reminder
    (0, notification_reminders_1.notifyUsersThreeDaysLater)();
    //seven days later reminder
    (0, notification_reminders_1.notifyUsersSevenDaysLater)();
    //thirty days later reminder
    (0, notification_reminders_1.notifyUsersThirtyDaysLater)();
    //ninety days later reminder
    (0, notification_reminders_1.notifyUsersNinetyDaysLater)();
}
catch (error) {
    logger_1.default.error(error);
}
exports.default = app;
