import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'


dotenv.config()




export const updateHabitSharedWith = async (req: IReq | any, res: Response) => {
    try {
        const selectedHabit = await Habit.findById(req.body._id)
        const alreadySharedWith = selectedHabit?.sharedWith.some(elemfriends => {
            return elemfriends.toString() === req.body.userId.toString()
        })
        if (alreadySharedWith) {
            const updatedSelectedHabit = await Habit.findByIdAndUpdate(
                req.body._id,
                { $pull: { sharedWith: req.body.userId } },
                { new: true },
            )
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec()


            return res.status(200).json(updatedSelectedHabit)
        } else {
            const updatedSelectedHabit = await Habit.findByIdAndUpdate(
                req.body._id,
                { $push: { sharedWith: req.body.userId } },
                { new: true },
            )
                .populate({ path: 'sharedWith', model: 'User' })
                .slice('dates', -10) //last 10 numbers of the dates array
                .slice('upcomingDates', -10)
                .exec()


            return res.status(200).json(updatedSelectedHabit)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}