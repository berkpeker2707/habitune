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
            infoLogger.info(
                `User ${req.user[0]._id} invoked updateHabitFirstAndLastDate`,
            )
            res.status(200).json(selectedHabit)
        } else {
            errorLogger.error(
                `User ${req.user[0]._id} last date cannot be earlier than first date`,
            )
            res
                .status(500)
                .send(getErrorMessage('Last date cannot be earlier than first date'))
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
