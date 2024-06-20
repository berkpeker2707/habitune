import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'

const {
    cloudinaryUploadUserImg,
    cloudinaryDeleteUserImg,
} = require('../../middlewares/cloudinary')


import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

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
            return res.status(200).json(user)
        }
    } catch (error) {
        errorLogger.error(error)
        return res.status(500).send(getErrorMessage(error))
    }
}