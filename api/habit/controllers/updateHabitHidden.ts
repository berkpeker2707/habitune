import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'
import User from '../../user/models/user'
import Notification from '../../notifications/notification.model'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { infoLogger, errorLogger } from '../../middlewares/logger'
import calculateUpcomingDates from '../../middlewares/calculateUpcomingDates'
import isInCompletedDates from '../../middlewares/isInCompletedDates'
import isInArray from '../../middlewares/isInArray'

dotenv.config()



export const updateHabitHidden = async (req: IReq | any, res: Response) => {
    try {
        const selectedHabit = await Habit.findByIdAndUpdate(
            req.body._id,
            {
                $set: { isHidden: req.body.hidden },
            },
            { new: true },
        )
            .populate({ path: 'sharedWith', model: 'User' })
            .slice('dates', -10) //last 10 numbers of the dates array
            .slice('upcomingDates', -10)
            .exec()
        infoLogger.info(`User ${req.user[0]._id} invoked updateHabitHidden`)
        res.status(200).json(selectedHabit)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}