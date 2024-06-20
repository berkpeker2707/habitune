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

        infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabits`)
        res.status(200).json(loggedinUsersTodayHabits)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
