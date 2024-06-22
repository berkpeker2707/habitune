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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './api/.env' });
dotenv_1.default.config();
const key = (_a = process.env.FIREBASE_ADMINSDK_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/Ö/g, '').replace(/\\n/g, '\n');
const morganMiddleware_1 = __importDefault(require("./middlewares/morganMiddleware"));
const express_1 = __importDefault(require("express"));
// const session = require("express-session");
const formData = require('express-form-data');
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// import mongoStore from "./config/mongoStore";
const helmet_1 = __importDefault(require("helmet"));
const lowLimitter_1 = __importDefault(require("./middlewares/lowLimitter"));
const admin = require('firebase-admin');
const index_1 = __importDefault(require("./user/routes/index"));
const index_2 = __importDefault(require("./habit/routes/index"));
const notification_routes_1 = __importDefault(require("./notifications/notification.routes"));
const cronjob_1 = require("./cronjob");
const defaultLimitter_1 = __importDefault(require("./middlewares/defaultLimitter"));
const app = (0, express_1.default)();
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Server running at port: ${port}`));
const errors_util_1 = require("./utils/errors.util");
app.use(morganMiddleware_1.default);
console.log('first');
(0, db_1.default)();
// const mongoDBStore = mongoStore();
// app.use(
//   session({
//     secret: process.env.MONGODB_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: mongoDBStore,
//   })
// );
app.set('trust proxy', 1);
app.use(express_1.default.json());
//parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
app.use(formData.parse());
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, helmet_1.default)());
app.use((req, res, next) => {
    //defined speific rate limitters for routes below
    //also defined lowLimitter as default for all except below
    if (req.path.startsWith('/api/user') ||
        req.path.startsWith('/api/habit') ||
        req.path.startsWith('/api/notification')) {
        //skip limiter for /api/user, /api/habit, /api/notification and their sub-routes
        next();
    }
    else {
        (0, lowLimitter_1.default)(req, res, next);
    }
});
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
app.get('/privacy', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '/view/privacy.html'));
});
app.get('/image/empty-shell', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '/public/images/empty-shell.png'));
});
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '/view/index.html'));
});
app.get('/api/cronjob', [defaultLimitter_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cronjob_1.cronjob)(req, res);
    }
    catch (error) {
        console.error('Error executing cron job:', error);
        res.status(500).send((0, errors_util_1.getErrorMessage)('Internal Server Error'));
    }
}));
//routing
app.use('/api/user', index_1.default);
app.use('/api/habit', index_2.default);
app.use('/api/notification', notification_routes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map