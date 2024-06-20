import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

const jwt = require('jsonwebtoken')

const {
    cloudinaryDeleteUserImg,
} = require('../../middlewares/cloudinary')


import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'
const { v4: uuidv4 } = require('uuid');


dotenv.config()

export const signInWithGoogle = async (
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
            return res.status(200).json(token)
        } else {
            const user = await User.create({
                id: uuidv4(),
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
            return res.status(200).json(token)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}