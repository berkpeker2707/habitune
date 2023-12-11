import { notifyUser } from "./notifications/notification.reminders";

export default async (req: any, res: any) => {
  try {
    await notifyUser();
    res.status(200).send("Cron job executed successfully");
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
};
