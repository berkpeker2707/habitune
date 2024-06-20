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

            infoLogger.info(`User ${req.user[0]._id} invoked updateHabitColor`)
            res.status(200).json(selectedHabit)
        } else {
            errorLogger.error(`User ${req.user[0]._id} habit color is invalid`)
            res.status(500).send(getErrorMessage('Habit color is invalid'))
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
