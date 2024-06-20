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




export const deleteHabit = async (req: IReq | any, res: Response) => {
    try {
        await Habit.findOneAndDelete({
            _id: req.params.id,
        })

        await User.findOneAndUpdate(
            { _id: req.user[0]._id },
            {
                $pull: { habits: req.params.id },
            },
            { upsert: true },
        )

        await Notification.deleteMany({
            habitID: req.params.id,
        })

        infoLogger.info(`User ${req.user[0]._id} invoked deleteHabit`)
        res.status(200).json('Habit deleted')
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
