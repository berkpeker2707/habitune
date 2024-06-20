import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'
import Notification from '../../notifications/notification.model'
import Habit from '../../habit/habit.model'

import { IReq } from '../../middlewares/interfaces'
const jwt = require('jsonwebtoken')

const {
    cloudinaryUploadUserImg,
    cloudinaryDeleteUserImg,
} = require('../../middlewares/cloudinary')

// const path = require("path");

import dotenv from 'dotenv'
import { infoLogger, errorLogger } from '../../middlewares/logger'
const bcrypt = require('bcrypt')

dotenv.config()

export const fetchCurrentUserProfile = async (
    req: IReq | any,
    res: Response,
) => {
    try {
        var clientTime = parseInt(req.params.today)

        const loggedinUser = await User.findById(req.user[0]._id)
            .populate({ path: 'friends.friend', model: 'User' })
            .populate({
                path: 'habits',
                model: 'Habit',
            })
            .exec()

        if (req.params.today) {
            await loggedinUser?.updateOne({
                $set: { lastLogin: clientTime },
            })
        }
        infoLogger.info(`User ${req.user[0]._id} invoked fetchCurrentUserProfile`)
        res.status(200).json(loggedinUser)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
