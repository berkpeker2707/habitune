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


export const createHabit = async (req: IReq | any, res: Response) => {
    try {
        const checkUser = await User.findById(req.user[0]._id)

        if (checkUser && checkUser.habits.length >= 20) {
            errorLogger.error(`User ${req.user[0]._id} already has 20 habits`)
            res
                .status(500)
                .send(getErrorMessage(`User ${req.user[0]._id} already has 20 habits`))
        } else {
            const newHabit = await Habit.create({
                owner: req.user[0]._id,
                name: req.body.name,
                color: req.body.color ? req.body.color : '#968EB0',
                sharedWith: req.body.friendList,
                firstDate: req.body.firstDate,
                lastDate: req.body.lastDate,
                dates: [],
                upcomingDates: [],
                isHidden: false,
            })

            await User.findOneAndUpdate(
                { _id: req.user[0]._id },
                {
                    $push: { habits: [newHabit._id] },
                },
                { upsert: true },
            )

            var newHabitItem = await newHabit
                .updateOne({
                    $push: {
                        upcomingDates: [
                            ...(await calculateUpcomingDates(
                                req.body.firstDate,
                                req.body.lastDate,
                                req.body.upcomingDates
                                    ? req.body.upcomingDates
                                    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                            )),
                        ],
                    },
                })
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec()

            // console.log("newHabitItem: ", newHabitItem);
            infoLogger.info(`User ${req.user[0]._id} invoked createHabit`)
            res.status(200).json(newHabit)
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
