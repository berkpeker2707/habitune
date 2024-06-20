import { Router } from 'express'
import {
    signInWithGoogle,
    signIn,
    fetchCurrentUserProfile,
    fetchUserProfile,
    updateCurrentUserImage,
    sendFriendship,
    changeTheme,
    deleteUser,
    sendFeedback,
} from "../controllers/index"


import verifyToken from '../../middlewares/verifyToken'
import defaultLimitter from '../../middlewares/defaultLimitter'
import lowLimitter from '../../middlewares/lowLimitter'

const userRoutes = Router()

userRoutes.post('/google', lowLimitter, signInWithGoogle)

userRoutes.post('/signin', lowLimitter, signIn)

userRoutes.get(
    '/profile/:today',
    [verifyToken, defaultLimitter],
    fetchCurrentUserProfile,
)

userRoutes.get(
    '/selectedUser/profile/:userID',
    [verifyToken, defaultLimitter],
    fetchUserProfile,
)

userRoutes.post(
    '/update/profile/image',
    [verifyToken, defaultLimitter],
    updateCurrentUserImage,
)

userRoutes.post(
    '/update/feedback',
    [verifyToken, defaultLimitter],
    sendFeedback,
)

userRoutes.post(
    '/sendFriendshipRequest',
    [verifyToken, defaultLimitter],
    sendFriendship,
)

userRoutes.post('/changeTheme', [verifyToken, defaultLimitter], changeTheme)

userRoutes.delete('/delete/me', [verifyToken, defaultLimitter], deleteUser)

export default userRoutes
