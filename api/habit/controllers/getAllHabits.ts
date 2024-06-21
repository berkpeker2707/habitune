import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const getAllHabits = async (req: IReq | any, res: Response) => {
  try {
    const loggedinUsersHabits = await Habit.find({ owner: req.user[0]._id })
      .populate({ path: 'sharedWith', model: 'User' })
      .slice('dates', -10) //last 10 numbers of the dates array
      .slice('upcomingDates', -10)
      .exec()
    return res.status(200).json(loggedinUsersHabits)
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
