import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'


import dotenv from 'dotenv'
import { infoLogger, errorLogger } from '../../middlewares/logger'


dotenv.config()

export const fetchCurrentUserProfile = async (
    req: IReq | any,
    res: Response,
) => {
    try {
        var nowUTC = new Date().toISOString();

        const loggedinUser = await User.findById(req.user[0].id)

        // .populate({ path: 'friends.friend', model: 'User' })
        // .populate({
        //     path: 'habits',
        //     model: 'Habit',
        // })
        // .exec()


        await loggedinUser?.updateOne({
            $set: { lastLogin: nowUTC },
        })

        infoLogger.info(`User ${req.user[0].id} invoked fetchCurrentUserProfile`)
        res.status(200).json(loggedinUser)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
