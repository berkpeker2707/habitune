import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Habit from "./habit.model";
import User from "../user/user.model";
import Notification from "../notifications/notification.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import { infoLogger, errorLogger } from "../middlewares/logger";
import calculateUpcomingDates from "../middlewares/calculateUpcomingDates";
import isInCompletedDates from "../middlewares/isInCompletedDates";
import isInArray from "../middlewares/isInArray";

dotenv.config();

export const createHabit = async (req: IReq | any, res: Response) => {
  try {
    const checkUser = await User.findById(req.user[0]._id);

    if (checkUser && checkUser.habits.length >= 20) {
      errorLogger.error(`User ${req.user[0]._id} already has 20 habits`);
      res
        .status(500)
        .send(getErrorMessage(`User ${req.user[0]._id} already has 20 habits`));
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
      infoLogger.info(`User ${req.user[0]._id} invoked createHabit`);
      res.status(200).json(newHabit);
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const getAllHabits = async (req: IReq | any, res: Response) => {
  try {
    const loggedinUsersHabits = await Habit.find({ owner: req.user[0]._id })
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    infoLogger.info(`User ${req.user[0]._id} invoked getAllHabits`);
    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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

    infoLogger.info(
      `User ${req.user[0]._id} invoked getAllHabitsOfSelectedUser`
    );
    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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

    infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabits`);
    res.status(200).json(loggedinUsersTodayHabits);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const getTodaysHabitsBoolean = async (
  req: IReq | any,
  res: Response
) => {
  try {
    var clientTime = parseInt(req.params.today);

    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.user[0]._id,
    })
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    var todaysHabitBooleanData;
    todaysHabitBooleanData = loggedinUsersTodayHabits.map(
      (allHabitsItem: any) => {
        return isInCompletedDates(allHabitsItem.dates, new Date(clientTime));
      }
    );

    infoLogger.info(`User ${req.user[0]._id} invoked getTodaysHabitsBoolean`);
    res.status(200).json(todaysHabitBooleanData);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const getCurrentHabitWeekStreakBoolean = async (
  req: IReq | any,
  res: Response
) => {
  try {
    var clientTime = parseInt(req.params.today);

    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.user[0]._id,
    })
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    var currentHabitWeekStreakData;
    currentHabitWeekStreakData = loggedinUsersTodayHabits.map(
      (allHabitsItem: any) => {
        if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 6,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 5,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 4,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 3,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 2,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 7;
        } else if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 5,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 4,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 3,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 2,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 6;
        } else if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 4,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 3,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 2,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 5;
        } else if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 3,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 2,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 4;
        } else if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 2,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 3;
        } else if (
          isInArray(
            allHabitsItem.dates,
            new Date(
              new Date(
                new Date(clientTime).getFullYear(),
                new Date(clientTime).getMonth(),
                new Date(clientTime).getDate() - 1,
                new Date(clientTime).getHours(),
                new Date(clientTime).getMinutes(),
                new Date(clientTime).getSeconds()
              )
            )
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 2;
        } else if (isInArray(allHabitsItem.dates, new Date(clientTime))) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    infoLogger.info(
      `User ${req.user[0]._id} invoked getCurrentHabitWeekStreakBoolean`
    );
    res.status(200).json(currentHabitWeekStreakData);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const getAllHabitDatesDotsBoolean = async (
  req: IReq | any,
  res: Response
) => {
  var clientTime = parseInt(req.params.today);

  const loggedinUsersTodayHabits = await Habit.find({
    owner: req.user[0]._id,
  })
    .populate({ path: "sharedWith", model: "User" })
    .slice("dates", -10) //last 10 numbers of the dates array
    .slice("upcomingDates", -10)
    .exec();

  var allHabitDatesDotsData: Array<boolean> = [];

  for (var i = 0; i < loggedinUsersTodayHabits.length; i++) {
    allHabitDatesDotsData.push(
      isInArray(loggedinUsersTodayHabits[i].dates, new Date(clientTime))
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 1,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 2,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 3,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 4,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 5,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
    allHabitDatesDotsData.push(
      isInArray(
        loggedinUsersTodayHabits[i].dates,
        new Date(
          new Date(
            new Date(clientTime).getFullYear(),
            new Date(clientTime).getMonth(),
            new Date(clientTime).getDate() - 6,
            new Date(clientTime).getHours(),
            new Date(clientTime).getMinutes(),
            new Date(clientTime).getSeconds()
          )
        )
      )
    );
  }
  res.status(200).json(allHabitDatesDotsData);
};

export const getSingleHabit = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = req.body.selectedHabit;
    const loggedinUsersHabits = await Habit.findById(selectedHabit)
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();

    infoLogger.info(`User ${req.user[0]._id} invoked getSingleHabit`);
    res.status(200).json(loggedinUsersHabits);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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

    await Notification.deleteMany({
      habitID: req.params.id,
    });

    infoLogger.info(`User ${req.user[0]._id} invoked deleteHabit`);
    res.status(200).json("Habit deleted");
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitName = async (req: IReq | any, res: Response) => {
  try {
    if (req.body.name.length > 0) {
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

      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitName`);
      res.status(200).json(selectedHabit);
    } else {
      errorLogger.error(`User ${req.user[0]._id} habit name is invalid`);
      res.status(500).send(getErrorMessage("Habit name is invalid"));
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitColor = async (req: IReq | any, res: Response) => {
  try {
    if (
      (req.body.color.length > 0 && req.body.color === "#968EB0") ||
      req.body.color === "#9DB2CE" ||
      req.body.color === "#C04F43" ||
      req.body.color === "#A5D2AC" ||
      req.body.color === "#99BB42" ||
      req.body.color === "#F59732" ||
      req.body.color === "#F1867E" ||
      req.body.color === "#FCCA1B" ||
      req.body.color === "#4D6691" ||
      req.body.color === "#6EA8D8" ||
      req.body.color === "#DEB4CF" ||
      req.body.color === "#F6AF90"
    ) {
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

      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitColor`);
      res.status(200).json(selectedHabit);
    } else {
      errorLogger.error(`User ${req.user[0]._id} habit color is invalid`);
      res.status(500).send(getErrorMessage("Habit color is invalid"));
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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

      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitSharedWith`);
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

      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitSharedWith`);
      res.status(200).json(updatedSelectedHabit);
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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
      infoLogger.info(
        `User ${req.user[0]._id} invoked updateHabitFirstAndLastDate`
      );
      res.status(200).json(selectedHabit);
    } else {
      errorLogger.error(
        `User ${req.user[0]._id} last date cannot be earlier than first date`
      );
      res
        .status(500)
        .send(getErrorMessage("Last date cannot be earlier than first date"));
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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
      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitDates`);
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
      infoLogger.info(`User ${req.user[0]._id} invoked updateHabitDates`);
      res.status(200).json(updatedSelectedHabit);
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
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
      infoLogger.info(
        `User ${req.user[0]._id} invoked updateHabitCompletedDate`
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
      infoLogger.info(
        `User ${req.user[0]._id} invoked updateHabitCompletedDate`
      );
      res.status(200).json(selectedHabit);
    }
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};

export const updateHabitHidden = async (req: IReq | any, res: Response) => {
  try {
    const selectedHabit = await Habit.findByIdAndUpdate(
      req.body._id,
      {
        $set: { isHidden: req.body.hidden },
      },
      { new: true }
    )
      .populate({ path: "sharedWith", model: "User" })
      .slice("dates", -10) //last 10 numbers of the dates array
      .slice("upcomingDates", -10)
      .exec();
    infoLogger.info(`User ${req.user[0]._id} invoked updateHabitHidden`);
    res.status(200).json(selectedHabit);
  } catch (error) {
    errorLogger.error(error);
    res.status(500).send(getErrorMessage(error));
  }
};
