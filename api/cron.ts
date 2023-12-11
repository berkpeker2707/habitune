import { notifyUser } from "./notifications/notification.reminders";

export default function handler(req: any, res: any) {
  notifyUser();
  res.status(200).end("Hello Cron!");
}
