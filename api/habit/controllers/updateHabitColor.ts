import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const updateHabitColor = async (req: IReq | any, res: Response) => {
  try {
    if (
      (req.body.color.length > 0 && req.body.color === '#968EB0') ||
      req.body.color === '#9DB2CE' ||
      req.body.color === '#C04F43' ||
      req.body.color === '#A5D2AC' ||
      req.body.color === '#99BB42' ||
      req.body.color === '#F59732' ||
      req.body.color === '#F1867E' ||
      req.body.color === '#FCCA1B' ||
      req.body.color === '#4D6691' ||
      req.body.color === '#6EA8D8' ||
      req.body.color === '#DEB4CF' ||
      req.body.color === '#F6AF90'
    ) {
      const selectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        {
          $set: { color: req.body.color },
        },
        { new: true },
      )
        .populate({ path: 'sharedWith', model: 'User' })
        .slice('dates', -10) //last 10 numbers of the dates array
        .slice('upcomingDates', -10)
        .exec()

      return res.status(200).json(selectedHabit)
    } else {
      errorLogger.error(`User ${req.user[0]._id} habit color is invalid`)
      return res.status(500).send(getErrorMessage('Habit color is invalid'))
    }
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
