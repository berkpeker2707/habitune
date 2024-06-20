import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'
import Notification from '../../notifications/notification.model'
import Habit from '../../habit/habit.model'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { infoLogger, errorLogger } from '../../middlewares/logger'


dotenv.config()


export const deleteUser = async (req: IReq | any, res: Response) => {
    try {
        const loggedinUser = await User.findById(req.user[0]._id)
        if (loggedinUser?.habits.length && loggedinUser.habits.length > 0) {
            for (let i = 0; i < loggedinUser.habits.length; i++) {
                await Habit.findOneAndDelete({
                    _id: loggedinUser.habits[i],
                })
            }

            if (loggedinUser?.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    await User.findOneAndUpdate(
                        {
                            _id: loggedinUser.friends[y].friend,
                        },
                        {
                            $pull: { friends: { friend: loggedinUser?._id } },
                        },
                    )
                }
            }

            await User.findOneAndDelete({
                _id: req.user[0]._id,
            })

            await Notification.findOneAndDelete({
                userID: req.user[0]._id,
            })

            infoLogger.info(`User ${req.user[0]._id} invoked deleteUser`)
            res.status(200).json(loggedinUser)
        } else {
            // console.log("No habit detected.");

            if (loggedinUser?.friends) {
                for (let y = 0; y < loggedinUser.friends.length; y++) {
                    await User.findOneAndUpdate(
                        {
                            _id: loggedinUser?.friends[y].friend,
                        },
                        {
                            $pull: { friends: { friend: loggedinUser?._id } },
                        },
                    )
                }
            }

            await User.findOneAndDelete({
                _id: req.user[0]._id,
            })

            await Notification.findOneAndDelete({
                userID: req.user[0]._id,
            })
            infoLogger.info(`User ${req.user[0]._id} invoked deleteUser`)
            res.status(200).json(loggedinUser)
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
