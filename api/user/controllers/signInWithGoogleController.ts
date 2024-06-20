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

export const signInWithGoogleController = async (
    req: Request,
    res: Response,
) => {
    try {
        var userExists = await User.exists({ email: req.body.email })

        if (userExists) {
            //update user picture starts
            var foundUser = await User.findOne({ email: req.body.email })

            //delete old profile image if exists
            if (
                (foundUser && foundUser.image.length > 1) ||
                (foundUser && foundUser.image.includes('https://res.cloudinary.com'))
            ) {
                await cloudinaryDeleteUserImg(foundUser.image)
            }

            await User.findOneAndUpdate(
                { email: req.body.email },
                { image: req.body.picture },
            )

            //update user picture ends
            var token = await jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
                expiresIn: '365d',
            })

            infoLogger.info(
                `User invoked signInWithGoogleController, token: ${token}`,
            )
            res.status(200).json(token)
        } else {
            const user = await User.create({
                id: req.body.id,
                firstName: req.body.name,
                email: req.body.email,
                image: req.body.picture,
                fcmToken: 'empty',
                userType: 'standart',
                theme: 'default',
            })
            await user.save()

            var token = await jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: '365d',
            })
            infoLogger.info(
                `User invoked signInWithGoogleController, token: ${token}`,
            )
            res.status(200).json(token)
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}