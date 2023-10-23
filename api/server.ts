import express, { Express, Request, Response } from "express";
import db from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
const rateLimit = require("express-rate-limit");

//logger is winston, can log all and categorize all as you wish
// import Logger from "./middlewares/logger";
//morgan is for checking requests
import morganMiddleware from "./middlewares/morganMiddleware";

import userRoutes from "./user/user.routes";
import habitRoutes from "./habit/habit.routes";
import notificationRoutes from "./notifications/notification.routes";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1111;

app.use(express.json());

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

//rate limitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

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
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index.html"));
});
app.get("/image/empty-shell", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/images/empty-shell.png"));
});

//routing
app.use("/api/user", userRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/notification", notificationRoutes);

export default app;
