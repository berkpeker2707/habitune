import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const updateHabitFirstAndLastDate = async (
  req: IReq | any,
  res: Response,
) => {
  try {
    if (req.body.lastDate > req.body.firstDate) {
      const selectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        {
          $set: { firstDate: req.body.firstDate, lastDate: req.body.lastDate },
        },
        { upsert: false, new: true },
      )
        .populate({ path: 'sharedWith', model: 'User' })
        .slice('dates', -10) //last 10 numbers of the dates array
        .slice('upcomingDates', -10)
        .exec()

      return res.status(200).json(selectedHabit)
    } else {
      errorLogger.error(
        `User ${req.user[0]._id} last date cannot be earlier than first date`,
      )
      return res
        .status(500)
        .send(getErrorMessage('Last date cannot be earlier than first date'))
    }
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
