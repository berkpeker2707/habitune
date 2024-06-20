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


export const updateCurrentUserImage = async (
    req: IReq | any,
    res: Response,
) => {
    try {
        const localPath = req?.files?.image?.path

        const imgUploaded = await cloudinaryUploadUserImg(
            localPath,
            req.user[0]._id,
        )

        const foundUserPicture = await User.findById(req.user[0]._id)

        //delete old profile image if exists
        if (
            (foundUserPicture && foundUserPicture.image.length > 1) ||
            (foundUserPicture &&
                foundUserPicture.image.includes('https://res.cloudinary.com'))
        ) {
            await cloudinaryDeleteUserImg(foundUserPicture.image)

            const user = await User.findByIdAndUpdate(
                req.user[0]._id,
                {
                    image: imgUploaded.secure_url,
                },
                { new: true },
            )
            infoLogger.info(`User ${req.user[0]._id} invoked updateCurrentUserImage`)
            res.status(200).json(user)
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}