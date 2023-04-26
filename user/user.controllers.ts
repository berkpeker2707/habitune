import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import User from "./user.model";

import { IReq } from "../middlewares/interfaces";
const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

dotenv.config();

export const callbackSignInWithGoogle = async (req: Request, res: Response) => {
  try {
    var token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).json({
      accessToken: token,
      message: "Login Successful",
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const fetchCurrentUserProfile = async (
  req: IReq | any,
  res: Response
) => {
  try {
    const loggedinUser = await User.findById(req.user[0]._id);
    res.status(200).json(loggedinUser);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const fetchUserProfile = async (req: IReq | any, res: Response) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const sendFriendship = async (req: IReq | any, res: Response) => {
  try {
    const userMail = req.body.userMail;
    const user = await User.find({ email: userMail });
    const loggedinUser = await User.findById(req.user[0]._id);

    if (!user) {
      return res.json({
        message: "Email with such user does not exists.",
      });
    }

    // const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
    //   return element.friend.toString() == user[0]._id.toString();
    // });

    const currentUserAlreadyHasUserFriend = loggedinUser?.friends.some(
      (element) => {
        return (
          element.friend.toString() == user[0]._id.toString() &&
          element.pending === false
        );
      }
    );

    const currentUserHasPendingUserFriend = loggedinUser?.friends.some(
      (element) => {
        return (
          element.friend.toString() == user[0]._id.toString() &&
          element.pending === true
        );
      }
    );

    // const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
    //   return elemfriends.friend.toString() === req.user[0]._id.toString();
    // });

    const targetUserAlreadyHasCurrentUser = user[0].friends.some(
      (elemfriends) => {
        return (
          elemfriends.friend.toString() === req.user[0]._id.toString() &&
          elemfriends.pending === false
        );
      }
    );

    const targetUserHasPendingCurrentUser = user[0].friends.some(
      (elemfriends) => {
        return (
          elemfriends.friend.toString() === req.user[0]._id.toString() &&
          elemfriends.pending === true
        );
      }
    );

    if (
      !currentUserHasPendingUserFriend &&
      !currentUserAlreadyHasUserFriend &&
      !targetUserHasPendingCurrentUser &&
      !targetUserAlreadyHasCurrentUser
    ) {
      // console.log("only loggedinUser wants friendship ///// DONE");

      await loggedinUser?.updateOne(
        {
          $push: { friends: [{ friend: user[0]._id, pending: true }] },
        },
        { upsert: true }
      );

      res.status(200).json(loggedinUser);
    } else if (currentUserHasPendingUserFriend) {
      // console.log(
      //   "currentUser has already added target user but still pending --- remove pending ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $pull: { friends: { friend: user[0]._id } },
        },
        { multi: true }
      );

      res.status(200).json(loggedinUser);
    } else if (
      currentUserAlreadyHasUserFriend &&
      targetUserAlreadyHasCurrentUser
    ) {
      // console.log(
      //   "currentUser and target user has agreed friendship with --- break friendship ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $pull: { friends: { friend: user[0]._id } },
        },
        { multi: true }
      );

      await user[0]?.updateOne(
        {
          $pull: { friends: { friend: req.user[0]._id } },
        },
        { multi: true }
      );
      res.status(200).json(loggedinUser);
    } else if (targetUserHasPendingCurrentUser) {
      // console.log(
      //   "target user had sent friendship request and current user has just send as well --- from friendship ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $push: { friends: [{ friend: user[0]._id, pending: false }] },
        },
        { upsert: true }
      );

      await User.findOneAndUpdate(
        {
          friends: { $elemMatch: { friend: req.user[0]._id, pending: true } },
        },

        {
          $set: { "friends.$.pending": false },
        }
      );

      res.status(200).json(loggedinUser);
    } else {
      // console.log("I KNOWN REQUEST");
      res.status(200).json(loggedinUser);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
