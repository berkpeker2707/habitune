import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";

import User from "./user.model";
import Notification from "../notifications/notification.model";
import Habit from "../habit/habit.model";

import { IReq } from "../middlewares/interfaces";
const jwt = require("jsonwebtoken");

const {
  cloudinaryUploadUserImg,
  cloudinaryDeleteUserImg,
} = require("../middlewares/cloudinary");
const path = require("path");

import dotenv from "dotenv";
import Logger from "../middlewares/logger";
const bcrypt = require("bcrypt");

dotenv.config();

export const signInWithGoogleController = async (
  req: Request,
  res: Response
) => {
  try {
    var userExists = await User.exists({ email: req.body.email });

    if (userExists) {
      //update user picture starts
      var foundUser = await User.findOne({ email: req.body.email });

      //delete old profile image if exists
      if (
        (foundUser && foundUser.image.length > 1) ||
        (foundUser && foundUser.image.includes("https://res.cloudinary.com"))
      ) {
        await cloudinaryDeleteUserImg(foundUser.image);
      }

      await User.findOneAndUpdate(
        { email: req.body.email },
        { image: req.body.picture }
      );

      //update user picture ends
      var foundUser = await User.findOne({ email: req.body.email });
      var token = await jwt.sign({ user: foundUser }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      var foundNotification = await Notification.findOne({
        userID: foundUser?._id,
      });
      if (!foundNotification) {
        await Notification.create({
          userID: foundUser?._id,
          tokenID: "empty",
        });
      }

      res.status(200).json(token);
    } else {
      const user = await User.create({
        id: req.body.id,
        firstName: req.body.name,
        email: req.body.email,
        image: req.body.picture,
        fcmToken: "empty",
        userType: "standart",
        theme: "default",
      });
      await user.save();

      var foundNotification = await Notification.findOne({
        userID: user?._id,
      });
      if (!foundNotification) {
        await Notification.create({
          userID: user?._id,
          tokenID: "empty",
        });
      }

      var token = await jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      res.status(200).json(token);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const signInController = async (req: IReq | any, res: Response) => {
  try {
    const emailRegex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    if (!emailRegex.test(req.body.email)) {
      Logger.error("Unacceptable email");
      res.status(500).send(getErrorMessage("Unacceptable email"));
    } else {
      var userExists = await User.exists({ email: req.body.email });

      if (userExists) {
        const thatUser = await User.findOne({ email: req.body.email });

        const result = await bcrypt.compare(
          req.body.password,
          thatUser?.password
        );
        if (result) {
          var foundUser = await User.findOne({ email: req.body.email });
          var token = await jwt.sign(
            { user: foundUser },
            process.env.JWT_SECRET,
            {
              expiresIn: "365d",
            }
          );

          var foundNotification = await Notification.findOne({
            userID: foundUser?._id,
          });
          if (!foundNotification) {
            await Notification.create({
              userID: foundUser?._id,
              tokenID: "empty",
            });
          }

          res.status(200).json(token);
        } else {
          Logger.error("Wrong password or email.");
          return res
            .status(500)
            .send(getErrorMessage("Wrong password or email."));
        }
      } else {
        if (
          (!req.body.id && req.body.id !== 0) ||
          (!req.body.name && req.body.name === "") ||
          (!req.body.email && req.body.email === "") ||
          (!req.body.password && req.body.password === "")
        ) {
          Logger.error("Need all required data");
          res.status(500).send(getErrorMessage("Need all required data"));
        } else {
          const user = await User.create({
            id: req.body.id,
            firstName: req.body.name,
            email: req.body.email,
            image: "https://www.habitune.net/image/empty-shell",
            password: await bcrypt.hash(req.body.password, 10),
            fcmToken: "empty",
            userType: "standart",
            theme: "default",
          });
          await user.save();

          var foundNotification = await Notification.findOne({
            userID: user?._id,
          });
          if (!foundNotification) {
            await Notification.create({
              userID: user?._id,
              tokenID: "empty",
            });
          }

          var token = await jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "365d",
          });
          res.status(200).json(token);
        }
      }
    }
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
    var clientTime = parseInt(req.params.today);

    const loggedinUser = await User.findById(req.user[0]._id)
      .populate({ path: "friends.friend", model: "User" })
      .populate({
        path: "habits",
        model: "Habit",
      })
      .exec();

    if (req.params.today) {
      await loggedinUser?.updateOne({
        $set: { lastLogin: clientTime },
      });
    }

    var foundNotification = await Notification.findOne({
      userID: req.user[0]._id,
    });

    if (!foundNotification) {
      await Notification.create({
        userID: req.user[0]._id,
        tokenID: "empty",
      });
    }

    res.status(200).json(loggedinUser);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const fetchUserProfile = async (req: IReq | any, res: Response) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID)
      .populate({ path: "friends.friend", model: "User" })
      .populate({
        path: "habits",
        model: "Habit",
      })
      .exec();
    res.status(200).json(user);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const sendFriendship = async (req: IReq | any, res: Response) => {
  try {
    const userMail = req.body.userMail;

    const loggedinUser = await User.findById(req.user[0]._id);

    if (
      (await User.find({ email: userMail })).length < 1 ||
      userMail === req.user[0].email
    ) {
      return res.json({
        message: "Invalid Email.",
      });
    }

    const user = await User.find({ email: userMail });

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
      // console.log(
      //   "condition #1: only loggedinUser wants friendship ///// DONE"
      // );

      await loggedinUser?.updateOne(
        {
          $push: { friends: [{ friend: user[0]._id, pending: false }] },
        },
        { upsert: true }
      );

      await user[0]?.updateOne(
        {
          $push: { friends: [{ friend: req.user[0]._id, pending: true }] },
        },
        { upsert: true }
      );

      res.status(200).json(loggedinUser);
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
        { multi: true }
      );

      await user[0]?.updateOne(
        {
          $pull: { friends: { friend: req.user[0]._id } },
        },
        { multi: true }
      );

      res.status(200).json(loggedinUser);
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
        { multi: true }
      );

      await user[0]?.updateOne(
        {
          $pull: { friends: { friend: req.user[0]._id } },
        },
        { multi: true }
      );
      res.status(200).json(loggedinUser);
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
          friends: { $elemMatch: { friend: user[0]._id, pending: true } },
        },
        {
          $set: { "friends.$.pending": false },
        }
      );

      res.status(200).json(loggedinUser);
    } else {
      // console.log("target user know");
      res.status(200).json(loggedinUser);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateCurrentUserImage = async (
  req: IReq | any,
  res: Response
) => {
  try {
    const localPath = req?.files?.image?.path;

    const imgUploaded = await cloudinaryUploadUserImg(
      localPath,
      req.user[0]._id
    );

    const foundUserPicture = await User.findById(req.user[0]._id);

    //delete old profile image if exists
    if (
      (foundUserPicture && foundUserPicture.image.length > 1) ||
      (foundUserPicture &&
        foundUserPicture.image.includes("https://res.cloudinary.com"))
    ) {
      await cloudinaryDeleteUserImg(foundUserPicture.image);

      const user = await User.findByIdAndUpdate(
        req.user[0]._id,
        {
          image: imgUploaded.secure_url,
        },
        { new: true }
      );

      res.status(200).json(user);
    } else {
      res.json("Profile photo already deleted.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendFeedback = async (req: IReq | any, res: Response) => {
  try {
    if (req.body.feedback.length < 501) {
      var feedback = req.body.feedback;

      const currentUser = await User.findById(req.user[0]?._id);

      if (currentUser && currentUser.feedback.length >= 10) {
        return res
          .status(400)
          .json({ error: "Feedback limit reached (10 items)." });
      }

      const loggedinUser = await User.findByIdAndUpdate(
        req.user[0]?._id,
        { $push: { feedback: feedback } },
        { new: true }
      );
      res.status(200).json(loggedinUser);
    } else {
      Logger.error("Feedback limit 500 character reached");
      return res
        .status(400)
        .json({ error: "Feedback limit 500 character reached." });
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const changeTheme = async (req: IReq | any, res: Response) => {
  try {
    var newThemeValue = req.body.theme;

    const loggedinUser = await User.findByIdAndUpdate(
      req.user[0]?._id,
      { $set: { theme: newThemeValue } },
      { new: true }
    );

    res.status(200).json(loggedinUser);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteUser = async (req: IReq | any, res: Response) => {
  try {
    const loggedinUser = await User.findById(req.user[0]._id);
    if (loggedinUser?.habits.length && loggedinUser.habits.length > 0) {
      for (let i = 0; i < loggedinUser.habits.length; i++) {
        await Habit.findOneAndDelete({
          _id: loggedinUser.habits[i],
        });
      }

      if (loggedinUser?.friends) {
        for (let y = 0; y < loggedinUser.friends.length; y++) {
          console.log("first");
          await User.findOneAndUpdate(
            {
              _id: loggedinUser.friends[y].friend,
            },
            {
              $pull: { friends: { friend: loggedinUser?._id } },
            }
          );
          console.log(loggedinUser.friends[y].friend);
        }
      }

      await User.findOneAndDelete({
        _id: req.user[0]._id,
      });

      await Notification.findOneAndDelete({
        userID: req.user[0]._id,
      });

      res.status(200).json(loggedinUser);
    } else {
      console.log("No habit detected.");

      if (loggedinUser?.friends) {
        for (let y = 0; y < loggedinUser.friends.length; y++) {
          await User.findOneAndUpdate(
            {
              _id: loggedinUser?.friends[y].friend,
            },
            {
              $pull: { friends: { friend: loggedinUser?._id } },
            }
          );
        }
      }

      await User.findOneAndDelete({
        _id: req.user[0]._id,
      });

      await Notification.findOneAndDelete({
        userID: req.user[0]._id,
      });
      res.status(200).json(loggedinUser);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
