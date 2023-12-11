import Logger from "./middlewares/logger";
import { notifyUser } from "./notifications/notification.reminders";

export default async (req: any, res: any) => {
  try {
    await notifyUser();
    Logger.info("Cron job executed successfully");
    res.status(200).send("Cron job executed successfully");
  } catch (error) {
    Logger.info("Error executing cron job");
    res.status(500).send("Internal Server Error");
  }
};
