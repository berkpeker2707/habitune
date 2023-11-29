import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Habit from "./habit.model";
import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";
import calculateUpcomingDates from "../middlewares/calculateUpcomingDates";
import isInCompletedDates from "../middlewares/isInCompletedDates";

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
      const newHabit = await Habit.create({
        owner: req.user[0]._id,
        name: req.body.name,
        color: req.body.color ? req.body.color : "#968EB0",
        sharedWith: req.body.friendList,
        firstDate: req.body.firstDate,
        lastDate: req.body.lastDate,
        dates: [],
        upcomingDates: [],
        isHidden: false,
      });

      await User.findOneAndUpdate(
        { _id: req.user[0]._id },
        {
          $push: { habits: [newHabit._id] },
        },
        { upsert: true }
      );

      var newHabitItem = await newHabit
        .updateOne({
          $push: {
            upcomingDates: [
              ...(await calculateUpcomingDates(
                req.body.firstDate,
                req.body.lastDate,
                req.body.upcomingDates
                  ? req.body.upcomingDates
                  : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              )),
            ],
          },
        })
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();

      // console.log("newHabitItem: ", newHabitItem);

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
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getAllHabitsOfSelectedUser = async (
  req: IReq | any,
  res: Response
) => {
  try {
    const loggedinUsersHabits = await Habit.find({
      owner: req.params.id,
      isHidden: false,
    })
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const getTodaysHabits = async (req: IReq | any, res: Response) => {
  try {
    var clientTime = parseInt(req.params.today);

    //calculate the start and end timestamps for the current day
    const startOfToday = new Date(clientTime);
    startOfToday.setHours(0, 0, 0, 0); //set the time to 00:00:00.000
    const endOfToday = new Date(clientTime);
    endOfToday.setHours(23, 59, 59, 999); //set the time to 23:59:59.999

    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.user[0]._id,
      upcomingDates: {
        $gte: startOfToday, //greater than or equal to the start of the day
        $lte: endOfToday, //less than or equal to the end of the day
      },
    })
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
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
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
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
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
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
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
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
      )
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();
      res.status(200).json(updatedSelectedHabit);
    } else {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $push: { sharedWith: req.body.userId } },
        { new: true }
      )
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();
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
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
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
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
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
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
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
      todayReq.getDate(),
      todayReq.getHours(),
      todayReq.getMinutes(),
      todayReq.getSeconds()
    );

    const habit = await Habit.findOne({ _id: req.body._id }, "dates").exec();

    if (!habit) {
      console.log("Habit not found.");
      return [];
    }

    //if todays date is in checked dates which is stored in dates field
    var isHabitIsInDates = await isInCompletedDates(
      habit.dates,
      new Date(todayReq)
    );

    const selectedHabit = await Habit.findById(req.body._id);
    //if it is already in dates, pull the date back, else push the date in
    if (!isHabitIsInDates) {
      await selectedHabit
        ?.updateOne({ $push: { dates: today } })
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();

      //update last habit updated date

      // await loggedinUser?.updateOne({
      //   $set: { lastHabitUpdated: todayReq },
      // });

      await User.findOneAndUpdate(
        { _id: req.user[0]._id },
        {
          $set: { lastHabitUpdated: todayReq },
        },
        { upsert: true }
      );

      //modify notification bools
      await User.findOneAndUpdate(
        { _id: req.user[0]._id },
        {
          $set: {
            dayOneNotificationSent: false,
            dayThreeNotificationSent: false,
            daySevenNotificationSent: false,
            dayThirtyNotificationSent: false,
            dayNinetyNotificationSent: false,
          },
        },
        { upsert: true }
      );

      res.status(200).json(selectedHabit);
    } else {
      await selectedHabit
        ?.updateOne({
          $pop: { dates: 1 }, // Remove the last element from the 'dates' array
        })
        .populate({ path: "sharedWith", model: "User" })
        .slice("dates", -10) //last 10 numbers of the dates array
        .slice("upcomingDates", -10)
        .exec();
      res.status(200).json(selectedHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
