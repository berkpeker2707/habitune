import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { infoLogger, errorLogger } from '../../middlewares/logger'


dotenv.config()

export const fetchUserProfile = async (req: IReq | any, res: Response) => {
    try {
        const userID = req.params.userID
        const user = await User.findById(userID)
            .populate({ path: 'friends.friend', model: 'User' })
            .populate({
                path: 'habits',
                model: 'Habit',
            })
            .exec()
        infoLogger.info(
            `User ${req.user[0]._id} invoked fetchUserProfile for ${req.params.userID}`,
        )
        res.status(200).json(user)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}