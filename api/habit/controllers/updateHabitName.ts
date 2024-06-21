import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const updateHabitName = async (req: IReq | any, res: Response) => {
  try {
    if (req.body.name.length > 0) {
      const selectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        {
          $set: { name: req.body.name },
        },
        { new: true },
      )
        .populate({ path: 'sharedWith', model: 'User' })
        .slice('dates', -10) //last 10 numbers of the dates array
        .slice('upcomingDates', -10)
        .exec()

      return res.status(200).json(selectedHabit)
    } else {
      errorLogger.error(`User ${req.user[0]._id} habit name is invalid`)
      return res.status(500).send(getErrorMessage('Habit name is invalid'))
    }
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
