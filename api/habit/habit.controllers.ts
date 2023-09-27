import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Habit from "./habit.model";
import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";
import calculateUpcomingDates from "../middlewares/calculateUpcomingDates";

dotenv.config();

export const createHabit = async (req: IReq | any, res: Response) => {
  try {
    const checkUser = await User.findById(req.user[0]._id);

    if (checkUser && checkUser.habits && checkUser.habits.length >= 20) {
      Logger.error("User already has 20 habits.");
      return res
        .status(500)
        .send(getErrorMessage("User already has 20 habits."));
    } else {
      var todayReq = new Date(Date.now());
      var today = new Date(
        todayReq.getFullYear(),
        todayReq.getMonth(),
        todayReq.getDate()
      );

      var upComingDay = new Date(
        todayReq.getFullYear() + 1,
        todayReq.getMonth(),
        todayReq.getDate()
      );

      const newHabit = await Habit.create({
        owner: req.user[0]._id,
        name: req.body.name,
        color: req.body.color ?? "#968EB0",
        sharedWith: req.body.friendList,
        firstDate: req.body.firstDate ? req.body.firstDate : today,
        lastDate: req.body.lastDate ? req.body.lastDate : upComingDay,
        dates: [],
        upcomingDates: [],
      });

      await User.findOneAndUpdate(
        { _id: req.user[0]._id },
        {
          $push: { habits: [newHabit._id] },
        },
        { upsert: true }
      );

      await newHabit
        .updateOne({
          $push: {
            upcomingDates: [
              ...(await calculateUpcomingDates(
                req && req.body && req.body.firstDate
                  ? req.body.firstDate
                  : today,
                req && req.body && req.body.lastDate
                  ? req.body.lastDate
                  : upComingDay,
                req && req.body && req.body.upcomingDates
                  ? req.body.upcomingDates
                  : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              )),
            ],
          },
        })
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      res.status(200).json(newHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllHabits = async (req: IReq | any, res: Response) => {
  try {
    const loggedinUsersHabits = await Habit.find({ owner: req.user[0]._id })
      .populate({ path: "sharedWith", model: "User" })
      .exec();

    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getTodaysHabits = async (req: IReq | any, res: Response) => {
  try {
    const todayTemp = new Date();
    const today = new Date(
      todayTemp.getFullYear(),
      todayTemp.getMonth(),
      todayTemp.getDate()
    );

    const userTimezoneOffset = today.getTimezoneOffset() * 60000;
    const todayLocal = new Date(today.getTime() - userTimezoneOffset);

    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.user[0]._id,
      upcomingDates: { $in: [todayLocal] },
    })
      .populate({ path: "sharedWith", model: "User" })
      .exec();

    res.status(200).json(loggedinUsersTodayHabits);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getSingleHabit = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = req.body.selectedHabit;
    const loggedinUsersHabits = await Habit.findById(selectedHabit)
      .populate({ path: "sharedWith", model: "User" })
      .exec();

    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteHabit = async (req: IReq | any, res: Response) => {
  try {
    await Habit.findOneAndDelete({
      _id: req.params.id,
    });

    await User.findOneAndUpdate(
      { _id: req.user[0]._id },
      {
        $pull: { habits: req.params.id },
      },
      { upsert: true }
    );

    res.status(200).json("Habit deleted.");
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitName = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = await Habit.findByIdAndUpdate(
      req.body._id,
      {
        $set: { name: req.body.name },
      },
      { new: true }
    )
      .populate({ path: "sharedWith", model: "User" })
      .exec();

    res.status(200).json(selectedHabit);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitColor = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = await Habit.findByIdAndUpdate(
      req.body._id,
      {
        $set: { color: req.body.color },
      },
      { new: true }
    )
      .populate({ path: "sharedWith", model: "User" })
      .exec();

    res.status(200).json(selectedHabit);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitSharedWith = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = await Habit.findById(req.body._id);
    const alreadySharedWith = selectedHabit?.sharedWith.some((elemfriends) => {
      return elemfriends.toString() === req.body.userId.toString();
    });
    if (alreadySharedWith) {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $pull: { sharedWith: req.body.userId } },
        { new: true }
      );
      res.status(200).json(updatedSelectedHabit);
    } else {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $push: { sharedWith: req.body.userId } },
        { new: true }
      );
      res.status(200).json(updatedSelectedHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitFirstAndLastDate = async (
  req: IReq | any,
  res: Response
) => {
  try {
    if (req.body.lastDate > req.body.firstDate) {
      const selectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        {
          $set: { firstDate: req.body.firstDate, lastDate: req.body.lastDate },
        },
        { upsert: false, new: true }
      )
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      res.status(200).json(selectedHabit);
    } else {
      res.status(500).json("Last date cannot be earlier than first date.");
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitDates = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = await Habit.findById(req.body._id);
    const dateExists = selectedHabit?.dates.some((elemfriends) => {
      return elemfriends.getTime().toString() === req.body.date.toString();
    });
    if (dateExists) {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $pull: { dates: req.body.date } },
        { new: true }
      )
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      // console.log(true);
      res.status(200).json(updatedSelectedHabit);
    } else {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $push: { dates: req.body.date } },
        { new: true }
      )
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      // console.log(false);
      res.status(200).json(updatedSelectedHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitCompletedDate = async (
  req: IReq | any,
  res: Response
) => {
  try {
    var todayReq = new Date(req.body.date);
    var today = new Date(
      todayReq.getFullYear(),
      todayReq.getMonth(),
      todayReq.getDate()
    );
    function isInCompletedDates(array: any[] | undefined, value: Date) {
      return !!array?.find((item) => {
        return item.getTime() == value.getTime();
      });
    }
    const selectedHabit = await Habit.findById(req.body._id);
    //if it is already in dates, pull the date back, else push the date in
    if (!isInCompletedDates(selectedHabit?.dates, today)) {
      await selectedHabit
        ?.updateOne({ $push: { dates: today } })
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      res.status(200).json(selectedHabit);
    } else {
      await selectedHabit
        ?.updateOne({ $pull: { dates: today } })
        .populate({ path: "sharedWith", model: "User" })
        .exec();
      res.status(200).json(selectedHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
