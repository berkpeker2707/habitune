import { errorLogger, warnLogger } from './middlewares/logger'
import { notifyUser } from './notifications/notification.reminders'
import { getErrorMessage } from './utils/errors.util'

export const cronjob = async (req: any, res: any) => {
  try {
    await notifyUser()
    // console.log("Cron job executed successfully");
    warnLogger.warn('Cron job executed successfully')
    res.status(200).send('Cron job executed successfully')
  } catch (error) {
    // console.log(error);
    errorLogger.error(error)
    res.status(500).send(getErrorMessage(error))
  }
}
