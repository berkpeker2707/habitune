import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'


dotenv.config()

export const fetchUserProfile = async (req: IReq | any, res: Response) => {
    try {
        const userID = req.params.userID
        const user = await User.findById(userID)
        // .populate({ path: 'friends.friend', model: 'User' })
        // .populate({
        //     path: 'habits',
        //     model: 'Habit',
        // })
        // .exec()
        return res.status(200).json(user)
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}