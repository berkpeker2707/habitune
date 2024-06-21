import { Response } from 'express'

import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import isInArray from '../../middlewares/isInArray'

dotenv.config()


export const getFriendHabitDatesDotsBoolean = async (
    req: IReq | any,
    res: Response,
) => {
    var clientTime = parseInt(req.params.today)

    const loggedinUsersTodayHabits = await Habit.find({
        owner: req.params.friend,
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
    return res.status(200).json(allHabitDatesDotsData)
}