import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'
import User from '../../user/models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'
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
                isHidden: false,
            })

            await User.findOneAndUpdate(
                { _id: req.user[0]._id },
                {
                    $push: { habits: [newHabit._id] },
                },
                { upsert: true },
            )

            const newHabitItem = await newHabit
                .populate({ path: 'sharedWith', model: 'User' })

            return res.status(200).json(newHabitItem)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}
