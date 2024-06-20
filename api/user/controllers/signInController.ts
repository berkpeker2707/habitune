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

export const signInController = async (req: IReq | any, res: Response) => {
    try {
        // const emailRegex = new RegExp(
        //   "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
        // );
        const emailRegex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )

        if (!emailRegex.test(req.body.email)) {
            errorLogger.error('Unacceptable email')
            res.status(500).send(getErrorMessage('Unacceptable email'))
        } else {
            var userExists = await User.exists({ email: req.body.email })

            if (userExists) {
                const thatUser = await User.findOne({ email: req.body.email })

                const result = await bcrypt.compare(
                    req.body.password,
                    thatUser?.password,
                )
                if (result) {
                    var foundUser = await User.findOne({ email: req.body.email })
                    var token = await jwt.sign(
                        { user: foundUser },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '365d',
                        },
                    )
                    infoLogger.info(
                        `User ${req.body.email} invoked signInWithGoogleController, token: ${token}`,
                    )
                    res.status(200).json(token)
                } else {
                    errorLogger.error(
                        `Wrong password: ${req.body.password} or email: ${req.body.email}`,
                    )
                    res.status(500).send(getErrorMessage('Wrong password or email'))
                }
            } else {
                if (
                    (!req.body.id && req.body.id !== 0) ||
                    (!req.body.name && req.body.name === '') ||
                    (!req.body.email && req.body.email === '') ||
                    (!req.body.password && req.body.password === '')
                ) {
                    errorLogger.error('Need all required data')
                    res.status(500).send(getErrorMessage('Need all required data'))
                } else {
                    const user = await User.create({
                        id: req.body.id,
                        firstName: req.body.name,
                        email: req.body.email,
                        image: 'https://www.habitune.net/image/empty-shell',
                        password: await bcrypt.hash(req.body.password, 10),
                        fcmToken: 'empty',
                        userType: 'standart',
                        theme: 'default',
                    })
                    await user.save()

                    var token = await jwt.sign({ user: user }, process.env.JWT_SECRET, {
                        expiresIn: '365d',
                    })
                    infoLogger.info(
                        `User ${req.body.email} invoked signInWithGoogleController, token: ${token}`,
                    )
                    res.status(200).json(token)
                }
            }
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}