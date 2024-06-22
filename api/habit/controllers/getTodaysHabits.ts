import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const getTodaysHabits = async (req: IReq | any, res: Response) => {
  try {
    var clientTime = parseInt(req.params.today)

    //calculate the start and end timestamps for the current day
    const startOfToday = new Date(clientTime)
    startOfToday.setHours(0, 0, 0, 0) //set the time to 00:00:00.000
    const endOfToday = new Date(clientTime)
    endOfToday.setHours(23, 59, 59, 999) //set the time to 23:59:59.999

    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.user[0]._id,
      upcomingDates: {
        $gte: startOfToday, //greater than or equal to the start of the day
        $lte: endOfToday, //less than or equal to the end of the day
      },
    })
      .populate({ path: 'sharedWith', model: 'User' })
      .slice('dates', -10) //last 10 numbers of the dates array
      .slice('upcomingDates', -10)
      .exec()

    return res.status(200).json(loggedinUsersTodayHabits)
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
