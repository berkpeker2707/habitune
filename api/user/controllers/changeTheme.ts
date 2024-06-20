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

export const changeTheme = async (req: IReq | any, res: Response) => {
    try {
        var newThemeValue = req.body.theme

        const loggedinUser = await User.findByIdAndUpdate(
            req.user[0]?._id,
            { $set: { theme: newThemeValue } },
            { new: true },
        )
        infoLogger.info(`User ${req.user[0]._id} invoked changeTheme`)
        res.status(200).json(loggedinUser)
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
