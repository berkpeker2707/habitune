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


export const sendFriendship = async (req: IReq | any, res: Response) => {
    try {
        const userMail = req.body.userMail

        const loggedinUser = await User.findById(req.user[0]._id)

        if (
            (await User.find({ email: userMail })).length < 1 ||
            userMail === req.user[0].email
        ) {
            errorLogger.error(`Invalid Email: ${req.body.userMail}`)
            res
                .status(500)
                .send(getErrorMessage(`Invalid Email: ${req.body.userMail}`))
        }

        const user = await User.find({ email: userMail })

        // const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
        //   return element.friend.toString() == user[0]._id.toString();
        // });

        const currentUserAlreadyHasUserFriend = loggedinUser?.friends.some(
            element => {
                return (
                    element.friend.toString() == user[0]._id.toString() &&
                    element.pending === false
                )
            },
        )

        const currentUserHasPendingUserFriend = loggedinUser?.friends.some(
            element => {
                return (
                    element.friend.toString() == user[0]._id.toString() &&
                    element.pending === true
                )
            },
        )

        // const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
        //   return elemfriends.friend.toString() === req.user[0]._id.toString();
        // });

        const targetUserAlreadyHasCurrentUser = user[0].friends.some(
            elemfriends => {
                return (
                    elemfriends.friend.toString() === req.user[0]._id.toString() &&
                    elemfriends.pending === false
                )
            },
        )

        const targetUserHasPendingCurrentUser = user[0].friends.some(
            elemfriends => {
                return (
                    elemfriends.friend.toString() === req.user[0]._id.toString() &&
                    elemfriends.pending === true
                )
            },
        )

        if (
            !currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser
        ) {
            // console.log(
            //   "condition #1: only loggedinUser wants friendship ///// DONE"
            // );

            await loggedinUser?.updateOne(
                {
                    $push: {
                        friends: [{ friend: user[0]._id, pending: false, paired: false }],
                    },
                },
                { upsert: true },
            )

            await user[0]?.updateOne(
                {
                    $push: {
                        friends: [
                            { friend: req.user[0]._id, pending: true, paired: false },
                        ],
                    },
                },
                { upsert: true },
            )
            infoLogger.info(
                `User ${req.user[0]._id} invoked sendFriendship for ${req.body.userMail}`,
            )
            res.status(200).json(loggedinUser)
        } else if (
            !currentUserHasPendingUserFriend &&
            currentUserAlreadyHasUserFriend &&
            targetUserHasPendingCurrentUser &&
            !targetUserAlreadyHasCurrentUser
        ) {
            // console.log(
            //   "condition #2: currentUser has already added target user but still pending --- remove pending ///// DONE"
            // );

            await loggedinUser?.updateOne(
                {
                    $pull: { friends: { friend: user[0]._id } },
                },
                { multi: true },
            )

            await user[0]?.updateOne(
                {
                    $pull: { friends: { friend: req.user[0]._id } },
                },
                { multi: true },
            )
            infoLogger.info(
                `User ${req.user[0]._id} invoked sendFriendship for ${req.body.userMail}`,
            )
            res.status(200).json(loggedinUser)
        } else if (
            currentUserAlreadyHasUserFriend &&
            targetUserAlreadyHasCurrentUser
        ) {
            // console.log(
            //   "condition #3: currentUser and target user has agreed friendship with --- break friendship ///// DONE"
            // );

            await loggedinUser?.updateOne(
                {
                    $pull: { friends: { friend: user[0]._id } },
                },
                { multi: true },
            )

            await user[0]?.updateOne(
                {
                    $pull: { friends: { friend: req.user[0]._id } },
                },
                { multi: true },
            )

            // const loggedinUsersHabits = await Habit.find({ owner: req.user[0]._id })
            // await Habit.update(
            //   { owner: req.user[0]._id },
            //   { $pull: { sharedWith: user[0]._id } },
            // );
            await Habit.updateMany(
                { owner: req.user[0]._id },
                { $pull: { sharedWith: user[0]._id } },
            )

            infoLogger.info(
                `User ${req.user[0]._id} invoked sendFriendship for ${req.body.userMail}`,
            )
            res.status(200).json(loggedinUser)
        } else if (
            currentUserHasPendingUserFriend &&
            !currentUserAlreadyHasUserFriend &&
            !targetUserHasPendingCurrentUser &&
            targetUserAlreadyHasCurrentUser
        ) {
            // console.log(
            //   "condition #4: target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
            // );

            await User.findOneAndUpdate(
                {
                    _id: req.user[0]._id,
                    friends: {
                        $elemMatch: { friend: user[0]._id, pending: true, paired: false },
                    },
                },
                {
                    $set: { 'friends.$.pending': false, 'friends.$.paired': true },
                },
            )

            await User.findOneAndUpdate(
                {
                    _id: user[0]._id,
                    friends: {
                        $elemMatch: {
                            friend: req.user[0]._id,
                            pending: false,
                            paired: false,
                        },
                    },
                },
                {
                    $set: { 'friends.$.pending': false, 'friends.$.paired': true },
                },
            )
            infoLogger.info(
                `User ${req.user[0]._id} invoked sendFriendship for ${req.body.userMail}`,
            )
            res.status(200).json(loggedinUser)
        } else {
            // console.log("target user know");
            infoLogger.info(
                `User ${req.user[0]._id} invoked sendFriendship for ${req.body.userMail}`,
            )
            res.status(200).json(loggedinUser)
        }
    } catch (error) {
        errorLogger.error(error)
        res.status(500).send(getErrorMessage(error))
    }
}
