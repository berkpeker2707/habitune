import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import User from "./user.model";

import { IReq } from "../middlewares/interfaces";
const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
import Logger from "../middlewares/logger";
import mongoose from "mongoose";

var ObjectID = require("mongodb").ObjectID;

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

    // a) if loggedinUser has already send friend request, and receiver user didn't send any to loggedinUser then remove pending request
    //    or if receiver and loggedinUser are friends then remove loggedinUser's friend
    // b) else if user hasnt send friend request before,
    //    check if receiver already has sent it to loggedinUser friend request,
    //    if so then accept and make both loggedinUser and user pending to false
    // c) else add loggedinUser's pending friend to friendList with pending true

    const currentUserHasUserFriend = loggedinUser?.friends.some((element) => {
      return element.friend.toString() == user[0]._id.toString();
    });

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

    const targetUserHasCurrentUser = user[0].friends.some((elemfriends) => {
      return elemfriends.friend.toString() === req.user[0]._id.toString();
    });

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

    // console.log("########################################################");
    // console.log("########################################################");
    // console.log("########################################################");
    // console.log(
    //   "🚀 ~ file: user.controllers.ts:95 ~ sendFriendship ~ currentUserHasUserFriend:",
    //   currentUserHasUserFriend
    // );
    // console.log(
    //   "🚀 ~ file: user.controllers.ts:97 ~ sendFriendship ~ targetUserHasCurrentUser:",
    //   targetUserHasCurrentUser
    // );
    // console.log(
    //   "🚀 ~ file: user.controllers.ts:99 ~ sendFriendship ~ targetUserAlreadyHasCurrentUser:",
    //   targetUserAlreadyHasCurrentUser
    // );

    // console.log("########################################################");
    // console.log("########################################################");
    // console.log("########################################################");

    if (
      (currentUserHasUserFriend && !targetUserHasCurrentUser) ||
      (currentUserHasUserFriend && targetUserAlreadyHasCurrentUser)
    ) {
      console.log("CONDITION a");

      await loggedinUser?.updateOne(
        {
          $pull: { friends: { friend: user[0]._id } },
        },
        { multi: true }
      );

      res.status(200).json(loggedinUser);
    } else if (currentUserHasUserFriend && targetUserHasPendingCurrentUser) {
      console.log("CONDITION b");
      // console.log("requested user wants friendship as well");
      // await loggedinUser?.updateOne(
      //   {
      //     $push: { friends: [{ friend: user[0]._id, pending: false }] },
      //   },
      //   { upsert: true }
      // );
      // await user[0]?.
      await User.findOneAndUpdate(
        // { "friends.friend": req.user[0]._id },
        // // {
        // //   $push: { friends: [{ friend: req.user[0]._id, pending: false }] },
        // // }

        // {
        //   $set: {
        //     friends: { pending: false },
        //   },
        // }

        // $elemMatch finds docs containing an array with a matching element
        {
          friends: { $elemMatch: { friend: req.user[0]._id, pending: true } },
        },

        // Positional operator $ is a placeholder for the first matching array element
        {
          $set: { "friends.$.pending": false },
        }
      );
      res.status(200).json(loggedinUser);
    } else {
      console.log("CONDITION c");
      console.log("only loggedinUser wants friendship");

      await loggedinUser?.updateOne(
        {
          $push: { friends: [{ friend: user[0]._id, pending: true }] },
        },
        { upsert: true }
      );
      res.status(200).json(loggedinUser);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const confirmFriendship = async (req: IReq | any, res: Response) => {
  try {
    const userMail = req.body.userMail;
    const user = await User.find({ email: userMail });
    res.status(200).json(user);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const removeFriend = async (req: IReq | any, res: Response) => {
  try {
    const userMail = req.body.userMail;
    const user = await User.find({ email: userMail });
    res.status(200).json(user);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
