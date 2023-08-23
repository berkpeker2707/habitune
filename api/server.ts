import express, { Express, Request, Response } from "express";
import db from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import passport from "passport";

//logger is winston, can log all and categorize all as you wish
// import Logger from "./middlewares/logger";
//morgan is for checking requests
import morganMiddleware from "./middlewares/morganMiddleware";

import userRoutes from "./user/user.routes";
import habitRoutes from "./habit/habit.routes";
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

// passport config
require("./config/passport")(passport);

app.use(
  require("express-session")({
    secret: "Enter your secret key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

app.get("/privacy", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/privacy.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

//routing
app.use("/api/user", userRoutes);
app.use("/api/habit", habitRoutes);

export default app;
