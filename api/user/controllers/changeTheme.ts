import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const changeTheme = async (req: IReq | any, res: Response) => {
  try {
    var newThemeValue = req.body.theme

    const loggedinUser = await User.findByIdAndUpdate(
      req.user[0]?._id,
      { $set: { theme: newThemeValue } },
      { new: true },
    )
    return res.status(200).json(loggedinUser)
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
