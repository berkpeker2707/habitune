import { notifyUser } from "./notifications/notification.reminders";
import { getErrorMessage } from "./utils/errors.util";

export const cronjob = async (req: any, res: any) => {
  try {
    await notifyUser();
    console.log("Cron job executed successfully");
    return res.status(200).send("Cron job executed successfully");
  } catch (error) {
    console.log("Error executing cron job");
    return res.status(500).send(getErrorMessage("Internal Server Error"));
  }
};
