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


export const getTodaysHabitsBoolean = async (
    req: IReq | any,
    res: Response,
) => {
    try {
        var clientTime = parseInt(req.params.today)

        const loggedinUsersTodayHabits = await Habit.find({
            owner: req.user[0]._id,
        })
            .populate({ path: 'sharedWith', model: 'User' })
            .slice('dates', -10) //last 10 numbers of the dates array
            .slice('upcomingDates', -10)
            .exec()

        var todaysHabitBooleanData
        todaysHabitBooleanData = loggedinUsersTodayHabits.map(
            (allHabitsItem: any) => {
                return isInCompletedDates(allHabitsItem.dates, new Date(clientTime))
            },
        )

        infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabitsBoolean`)
        res.status(200).json(todaysHabitBooleanData)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
