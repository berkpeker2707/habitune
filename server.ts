import express, { Express, Request, Response } from "express";
import db from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import passport from "passport";
// import session from "express-session"; delete
import passportStrategy from "./config/passport";

//logger is winston, can log all and categorize all as you wish
//morgan is for checking requests
import Logger from "./middlewares/logger";
import morganMiddleware from "./middlewares/morganMiddleware";

dotenv.config();

import userRoutes from "./user/user.routes";
// import path from "path";
// import * as habitRoutes from "./habit/habit.routes";
// import * as friendRoutes from "./friend/friend.routes";
// import * as reminderRoutes from "./reminder/reminder.routes";

const app: Express = express();

const port = process.env.PORT || 1111;

app.use(express.json());
app.use(cors());
app.use(helmet());

//passport config
passportStrategy(passport);

app.use(passport.initialize());

db();
app.listen(port, () => console.log(`Server running at port: ${port}`));

//test requests for winston and morgan
app.use(morganMiddleware);
app.get("/logger", (_, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Hello world");
});

// requests
app.get("/health", (_, res) => {
  res.send("Working like a well-oiled machine!");
});

// app.get("/privacy", function (req, res) {
//   res.sendFile(path.join(__dirname, "/privacy.html"));
// });

//routing
app.use("/api/user", userRoutes);
// app.use("/api/habit", habitRoutes);
// app.use("/api/friend", friendRoutes);
// app.use("/api/reminder", reminderRoutes);

export default app;
