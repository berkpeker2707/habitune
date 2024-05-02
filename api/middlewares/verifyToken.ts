const jwt = require('jsonwebtoken')
require('dotenv').config()
import User from '../user/user.model'
import { getErrorMessage } from '../utils/errors.util'
import { errorLogger } from './logger'

interface idecoded {
  user: {
    _id: number
    id: number
    firstName: string
    email: string
    image: string
    habits: []
    friends: []
  }
}

const verifyToken = async (req: any, res: any, next: any) => {
  try {
    var jwtS = process.env.JWT_SECRET

    const bearerHeader = req.headers['authorization']

    const token = bearerHeader.split(' ')[1]

    const decoded: idecoded = jwt.verify(token, jwtS)

    if (!decoded) {
      errorLogger.error('Unauthorized')
      res.status(500).send(getErrorMessage('Unauthorized'))
    }

    const user = await User.find({ email: decoded.user.email })
    req.user = user

    next()
  } catch (error) {
    errorLogger.error('token error: ', error)
    // console.log("token error: ", error);
    res.status(500).send(getErrorMessage(error))
  }
}

export default verifyToken
