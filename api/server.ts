import path from "path";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.FIREBASE_ADMINSDK_PRIVATE_KEY?.replace(
  /Ö/g,
  ""
).replace(/\\n/g, "\n");

import morganMiddleware from "./middlewares/morganMiddleware";

import express, { Express } from "express";
const session = require("express-session");
const formData = require("express-form-data");
import cors from "cors";

import db from "./config/db";
import mongoStore from "./config/mongoStore";

import helmet from "helmet";
import lowLimitter from "./middlewares/lowLimitter";

const admin = require("firebase-admin");

import userRoutes from "./user/user.routes";
import habitRoutes from "./habit/habit.routes";
import notificationRoutes from "./notifications/notification.routes";

import { cronjob } from "./cronjob";
import defaultLimitter from "./middlewares/defaultLimitter";

const app: Express = express();
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Server running at port: ${port}`));

import { getErrorMessage } from "./utils/errors.util";
app.use(morganMiddleware);

db();
const mongoDBStore = mongoStore();

app.use(
  session({
    secret: process.env.MONGODB_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoDBStore,
  })
);

app.set("trust proxy", 1);

app.use(express.json());
//parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
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

app.use((req, res, next) => {
  //defined speific rate limitters for routes below
  //also defined lowLimitter as default for all except below
  if (
    req.path.startsWith("/api/user") ||
    req.path.startsWith("/api/habit") ||
    req.path.startsWith("/api/notification")
  ) {
    //skip limiter for /api/user, /api/habit, /api/notification and their sub-routes
    next();
  } else {
    lowLimitter(req, res, next);
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
  credential: admin.credential.cert(
    habitune_395006_firebase_adminsdk_yxw8e_3842870d9c
  ),
});

app.get("/privacy", function (req, res) {
  return res.sendFile(path.join(__dirname, "/view/privacy.html"));
});
app.get("/image/empty-shell", function (req, res) {
  return res.sendFile(path.join(__dirname, "/public/images/empty-shell.png"));
});
app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.get("/api/cronjob", [defaultLimitter], async (req: any, res: any) => {
  try {
    await cronjob(req, res);
  } catch (error) {
    console.error("Error executing cron job:", error);
    return res.status(500).send(getErrorMessage("Internal Server Error"));
  }
});

//routing
app.use("/api/user", userRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/notification", notificationRoutes);

export default app;
