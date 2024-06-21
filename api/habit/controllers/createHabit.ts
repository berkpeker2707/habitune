import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'
import User from '../../user/models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'
import calculateUpcomingDates from '../../middlewares/calculateUpcomingDates'
const { v4: uuidv4 } = require('uuid')

dotenv.config()


export const createHabit = async (req: IReq | any, res: Response) => {
    try {
        const checkUser = await User.findById(req.user[0]._id)

        if (checkUser && checkUser.habits.length >= 20) {
            errorLogger.error(`User ${req.user[0]._id} already has 20 habits`)
            return res
                .status(500)
                .send(getErrorMessage(`User ${req.user[0]._id} already has 20 habits`))
        } else {
            const newHabit = await Habit.create({
                id: uuidv4(),
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
            return res.status(200).json(newHabit)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}
