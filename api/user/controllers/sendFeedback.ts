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


export const sendFeedback = async (req: IReq | any, res: Response) => {
    try {
        if (req.body.feedback.length < 501) {
            var feedback = req.body.feedback

            const currentUser = await User.findById(req.user[0]?._id)

            if (currentUser && currentUser.feedback.length >= 10) {
                errorLogger.error('Feedback limit reached (10 items)')
                res
                    .status(500)
                    .send(getErrorMessage('Feedback limit reached (10 items)'))
            }

            const loggedinUser = await User.findByIdAndUpdate(
                req.user[0]?._id,
                { $push: { feedback: feedback } },
                { new: true },
            )
            infoLogger.info(`User ${req.user[0]._id} invoked sendFeedback`)
            res.status(200).json(loggedinUser)
        } else {
            errorLogger.error('Feedback limit 500 character reached')
            res
                .status(500)
                .send(getErrorMessage('Feedback limit 500 character reached'))
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
