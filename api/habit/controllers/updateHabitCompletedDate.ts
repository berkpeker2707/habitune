import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'
import User from '../../user/models/user'


import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

import isInCompletedDates from '../../middlewares/isInCompletedDates'


dotenv.config()



export const updateHabitCompletedDate = async (
    req: IReq | any,
    res: Response,
) => {
    try {
        var todayReq = new Date(req.body.date)
        var today = new Date(
            todayReq.getFullYear(),
            todayReq.getMonth(),
            todayReq.getDate(),
            todayReq.getHours(),
            todayReq.getMinutes(),
            todayReq.getSeconds(),
        )

        const habit = await Habit.findOne({ _id: req.body._id }, 'dates').exec()

        if (!habit) {
            console.log('Habit not found.')
            return []
        }

        //if todays date is in checked dates which is stored in dates field
        var isHabitIsInDates = await isInCompletedDates(
            habit.dates,
            new Date(todayReq),
        )

        const selectedHabit = await Habit.findById(req.body._id)
        //if it is already in dates, pull the date back, else push the date in
        if (!isHabitIsInDates) {
            await selectedHabit
                ?.updateOne({ $push: { dates: today } })
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec()

            //update last habit updated date

            // await loggedinUser?.updateOne({
            //   $set: { lastHabitUpdated: todayReq },
            // });

            await User.findOneAndUpdate(
                { _id: req.user[0]._id },
                {
                    $set: { lastHabitUpdated: todayReq },
                },
                { upsert: true },
            )

            //modify notification bools
            await User.findOneAndUpdate(
                { _id: req.user[0]._id },
                {
                    $set: {
                        dayOneNotificationSent: false,
                        dayThreeNotificationSent: false,
                        daySevenNotificationSent: false,
                        dayThirtyNotificationSent: false,
                        dayNinetyNotificationSent: false,
                    },
                },
                { upsert: true },
            )

            return res.status(200).json(selectedHabit)
        } else {
            await selectedHabit
                ?.updateOne({
                    $pop: { dates: 1 }, // Remove the last element from the 'dates' array
                })
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec()

            return res.status(200).json(selectedHabit)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}