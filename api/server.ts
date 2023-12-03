import express, { Express, Request, Response } from "express";
import db from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
const formData = require("express-form-data");
import helmet from "helmet";

//logger is winston, can log all and categorize all as you wish
// import Logger from "./middlewares/logger";
import Logger from "./middlewares/logger";
//morgan is for checking requests
import morganMiddleware from "./middlewares/morganMiddleware";

import userRoutes from "./user/user.routes";
import habitRoutes from "./habit/habit.routes";
import notificationRoutes from "./notifications/notification.routes";

import {
  notifyUsersDaily,
  notifyUsersSevenDaysLater,
  notifyUsersThreeDaysLater,
  notifyUsersThirtyDaysLater,
  notifyUsersNinetyDaysLater,
} from "./notifications/notification.reminders";

import path from "path";
import lowLimitter from "./middlewares/lowLimitter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1111;

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(formData.parse());

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());

// app.use(lowLimitter);
app.use((req, res, next) => {
  //defined speific rate limitters for routes below
  //also defined lowLimitter as default for all except below
  if (
    req.path.startsWith("/api/user") ||
    req.path.startsWith("/api/habit") ||
    req.path.startsWith("/api/notification")
  ) {
    // Skip limiter for /api/user, /api/habit, /api/notification and their sub-routes
    next();
  } else {
    lowLimitter(req, res, next);
  }
});

app.use(
  require("express-session")({
    secret: "Enter your secret key",
    resave: true,
    saveUninitialized: true,
  })
);

db();
app.listen(port, () => console.log(`Server running at port: ${port}`));

//test requests for winston and morgan
app.use(morganMiddleware);
// app.get("/logger", (_, res) => {
//   Logger.error("This is an error log");
//   Logger.warn("This is a warn log");
//   Logger.info("This is a info log");
//   Logger.http("This is a http log");
//   Logger.debug("This is a debug log");
//   res.send("Hello world");
// });

const key = process.env.FIREBASE_ADMINSDK_PRIVATE_KEY?.replace(
  /Ö/g,
  ""
).replace(/\\n/g, "\n");

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
  credential: admin.credential.cert(
    habitune_395006_firebase_adminsdk_yxw8e_3842870d9c
  ),
});

app.get("/privacy", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/privacy.html"));
});
app.get("/image/empty-shell", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images/empty-shell.png"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

//routing
app.use("/api/user", userRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/notification", notificationRoutes);

//reminders
try {
  // yesterday reminder
  notifyUsersDaily();

  //three days later reminder
  notifyUsersThreeDaysLater();

  //seven days later reminder
  notifyUsersSevenDaysLater();

  //thirty days later reminder
  notifyUsersThirtyDaysLater();

  //ninety days later reminder
  notifyUsersNinetyDaysLater();
} catch (error) {
  Logger.error(error);
}

export default app;
