import { notifyUser } from "./notifications/notification.reminders";

export const cronjob = async (req: any, res: any) => {
  try {
    await notifyUser();
    console.log("Cron job executed successfully");
    res.status(200).send("Cron job executed successfully");
  } catch (error) {
    console.log("Error executing cron job");
    res.status(500).send("Internal Server Error");
  }
};
