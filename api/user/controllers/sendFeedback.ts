import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const sendFeedback = async (req: IReq | any, res: Response) => {
  try {
    if (req.body.feedback.length < 501) {
      var feedback = req.body.feedback

      const currentUser = await User.findById(req.user[0]?._id)

      if (currentUser && currentUser.feedback.length >= 10) {
        errorLogger.error('Feedback limit reached (10 items)')
        return res
          .status(500)
          .send(getErrorMessage('Feedback limit reached (10 items)'))
      }

      const loggedinUser = await User.findByIdAndUpdate(
        req.user[0]?._id,
        { $push: { feedback: feedback } },
        { new: true },
      )
      return res.status(200).json(loggedinUser)
    } else {
      errorLogger.error('Feedback limit 500 character reached')
      return res
        .status(500)
        .send(getErrorMessage('Feedback limit 500 character reached'))
    }
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
