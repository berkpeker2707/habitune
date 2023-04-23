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

    if (
      loggedinUser?.friends?.find((element) => {
        element.friend.toString() === user[0]._id.toString();
      })
    ) {
      console.log("user has already sent friend request");

      await loggedinUser.updateOne(
        {
          $pull: { friends: { friend: user[0]._id, pending: true } },
        },
        { multi: true }
      );
      // await user.updateOne({ $pull: { likedPosts: selectedLike.postID } });

      res.status(200).json(loggedinUser);
    } else {
      console.log("user has never sent friend request");

      // console.log(
      //   "🚀 ~ file: user.controllers.ts:98 ~ sendFriendship ~ user[0].friends.includes(req.user[0]._id):",
      //   user[0].friends.includes(req.user[0]._id)
      // );

      // let tempA = user[0].friends.filter((elemfriends) => {
      //   return (
      //     elemfriends.friend.toString() === req.user[0]._id.toString() &&
      //     elemfriends.pending === true
      //   );
      // });
      // console.log(tempA);
      console.log(user[0].friends.includes(req.user[0]._id));

      if (
        // user[0].friends.includes({
        //   friend: req.user[0]._id,
        //   pending: true,
        // })
        user[0].friends.filter((elemfriends) => {
          return (
            elemfriends.friend.toString() === req.user[0]._id.toString() &&
            elemfriends.pending === true
          );
        }).length === 1
      ) {
        console.log("requested user wants friendship as well");
        await loggedinUser?.updateOne(
          {
            $push: { friends: [{ friend: user[0]._id, pending: false }] },
          },
          { upsert: true }
        );
      } else {
        console.log("breaking friendship");
        await loggedinUser?.updateOne(
          {
            $pull: { friends: { friend: user[0]._id, pending: false } },
          },
          { upsert: true }
        );
      }
      // await user.updateOne({ $push: { likedPosts: selectedLike.postID } });

      res.status(200).json(loggedinUser);
    }

    // res.status(200).json(user);
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
