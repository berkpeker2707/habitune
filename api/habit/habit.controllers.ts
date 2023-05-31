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
      const newHabit = await Habit.create({
        owner: req.user[0]._id,
        name: req.body.name,
        color: "",
        sharedWith: [],
        firstDate: req.body.firstDate ?? "",
        lastDate: req.body.lastDate ?? "",
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

      await newHabit.updateOne({
        $push: {
          upcomingDates: [
            ...(await calculateUpcomingDates(
              req && req.body && req.body.firstDate,
              req && req.body && req.body.lastDate,
              req && req.body && req.body.upcomingDates
            )),
          ],
        },
      });

      res.status(200).json(newHabit);
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};

export const deleteHabit = async (req: IReq | any, res: Response) => {
  try {
    await Habit.findOneAndDelete({
      _id: req.body._id,
    });

    await User.findOneAndUpdate(
      { _id: req.user[0]._id },
      {
        $pull: { habits: req.body._id },
      },
      { upsert: true }
    );

    res.status(200).json("Habit deleted.");
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
    );

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
      );
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
      );
      console.log(true);
      res.status(200).json(updatedSelectedHabit);
    } else {
      const updatedSelectedHabit = await Habit.findByIdAndUpdate(
        req.body._id,
        { $push: { dates: req.body.date } },
        { new: true }
      );
      console.log(false);
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
    let today = new Date(
      [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ].join("-")
    );
    function isInCompletedDates(array: any[] | undefined, value: Date) {
      return !!array?.find((item) => {
        return item.getTime() == value.getTime();
      });
    }
    const selectedHabit = await Habit.findById(req.body._id);

    if (!isInCompletedDates(selectedHabit?.dates, today)) {
      console.log(req.body.date);
      // await selectedHabit?.updateOne({ $push: { dates: req.body.date } });
      res.status(200).json("selectedHabit");
    } else {
      // await selectedHabit?.updateOne({ $pull: { dates: req.body.date } });
      res.status(200).json("selectedHabit");
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
