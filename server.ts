import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

//logger is winston, can log all and categorize all as you wish
//morgan is for checking requests
import Logger from "./middlewares/logger";
import morganMiddleware from "./middlewares/morganMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port: ${port}`);
});

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
