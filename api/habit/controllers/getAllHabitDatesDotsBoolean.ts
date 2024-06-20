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


export const getAllHabitDatesDotsBoolean = async (
    req: IReq | any,
    res: Response,
) => {
    var clientTime = parseInt(req.params.today)

    const loggedinUsersTodayHabits = await Habit.find({
        owner: req.user[0]._id,
    })
        .populate({ path: 'sharedWith', model: 'User' })
        .slice('dates', -10) //last 10 numbers of the dates array
        .slice('upcomingDates', -10)
        .exec()

    var allHabitDatesDotsData: Array<boolean> = []

    for (var i = 0; i < loggedinUsersTodayHabits.length; i++) {
        allHabitDatesDotsData.push(
            isInArray(loggedinUsersTodayHabits[i].dates, new Date(clientTime)),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 1,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 2,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 3,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 4,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 5,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
        allHabitDatesDotsData.push(
            isInArray(
                loggedinUsersTodayHabits[i].dates,
                new Date(
                    new Date(
                        new Date(clientTime).getFullYear(),
                        new Date(clientTime).getMonth(),
                        new Date(clientTime).getDate() - 6,
                        new Date(clientTime).getHours(),
                        new Date(clientTime).getMinutes(),
                        new Date(clientTime).getSeconds(),
                    ),
                ),
            ),
        )
    }
    res.status(200).json(allHabitDatesDotsData)
}
