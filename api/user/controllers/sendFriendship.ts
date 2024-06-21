import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'

import User from '../models/user'
import Habit from '../../habit/models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'

dotenv.config()

export const sendFriendship = async (req: IReq | any, res: Response) => {
  try {
    const userMail = req.body.userMail

    const loggedinUser = await User.findById(req.user[0].id)

    if (
      (await User.find({ email: userMail })).length < 1 ||
      userMail === req.user[0].email
    ) {
      errorLogger.error(`Invalid Email: ${req.body.userMail}`)
      return res
        .status(500)
        .send(getErrorMessage(`Invalid Email: ${req.body.userMail}`))
    }

    const user = await User.find({ email: userMail })

    // const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
    //   return element.friend.toString() == user[0].id.toString();
    // });

    const currentUserAlreadyHasUserFriend = loggedinUser?.friends.some(
      element => {
        return (
          element.friend.toString() == user[0].id.toString() &&
          element.pending === false
        )
      },
    )

    const currentUserHasPendingUserFriend = loggedinUser?.friends.some(
      element => {
        return (
          element.friend.toString() == user[0].id.toString() &&
          element.pending === true
        )
      },
    )

    // const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
    //   return elemfriends.friend.toString() === req.user[0].id.toString();
    // });

    const targetUserAlreadyHasCurrentUser = user[0].friends.some(
      elemfriends => {
        return (
          elemfriends.friend.toString() === req.user[0].id.toString() &&
          elemfriends.pending === false
        )
      },
    )

    const targetUserHasPendingCurrentUser = user[0].friends.some(
      elemfriends => {
        return (
          elemfriends.friend.toString() === req.user[0].id.toString() &&
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
      //     "condition #1: only loggedinUser wants friendship ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $push: {
            friends: [{ friend: user[0].id, pending: false, paired: false }],
          },
        },
        { upsert: true },
      )

      await user[0]?.updateOne(
        {
          $push: {
            friends: [{ friend: req.user[0].id, pending: true, paired: false }],
          },
        },
        { upsert: true },
      )
      return res.status(200).json(loggedinUser)
    } else if (
      !currentUserHasPendingUserFriend &&
      currentUserAlreadyHasUserFriend &&
      targetUserHasPendingCurrentUser &&
      !targetUserAlreadyHasCurrentUser
    ) {
      // console.log(
      //     "condition #2: currentUser has already added target user but still pending --- remove pending ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $pull: { friends: { friend: user[0].id } },
        },
        { multi: true },
      )

      await user[0]?.updateOne(
        {
          $pull: { friends: { friend: req.user[0].id } },
        },
        { multi: true },
      )
      return res.status(200).json(loggedinUser)
    } else if (
      currentUserAlreadyHasUserFriend &&
      targetUserAlreadyHasCurrentUser
    ) {
      // console.log(
      //     "condition #3: currentUser and target user has agreed friendship with --- break friendship ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $pull: { friends: { friend: user[0].id } },
        },
        { multi: true },
      )

      await user[0]?.updateOne(
        {
          $pull: { friends: { friend: req.user[0].id } },
        },
        { multi: true },
      )

      // const loggedinUsersHabits = await Habit.find({ owner: req.user[0].id })
      // await Habit.update(
      //   { owner: req.user[0].id },
      //   { $pull: { sharedWith: user[0].id } },
      // );
      await Habit.updateMany(
        { owner: req.user[0].id },
        { $pull: { sharedWith: user[0].id } },
      )
      return res.status(200).json(loggedinUser)
    } else if (
      currentUserHasPendingUserFriend &&
      !currentUserAlreadyHasUserFriend &&
      !targetUserHasPendingCurrentUser &&
      targetUserAlreadyHasCurrentUser
    ) {
      // console.log(
      //     "condition #4: target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
      // );

      await User.findOneAndUpdate(
        {
          _id: req.user[0].id,
          friends: {
            $elemMatch: { friend: user[0].id, pending: true, paired: false },
          },
        },
        {
          $set: { 'friends.$.pending': false, 'friends.$.paired': true },
        },
      )

      await User.findOneAndUpdate(
        {
          _id: user[0].id,
          friends: {
            $elemMatch: {
              friend: req.user[0].id,
              pending: false,
              paired: false,
            },
          },
        },
        {
          $set: { 'friends.$.pending': false, 'friends.$.paired': true },
        },
      )
      return res.status(200).json(loggedinUser)
    } else {
      console.log('target user know')
      return res.status(200).json(loggedinUser)
    }
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
