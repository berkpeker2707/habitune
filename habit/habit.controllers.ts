import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";
import Habit from "./habit.model";
import User from "../user/user.model";

import { IReq } from "../middlewares/interfaces";

import dotenv from "dotenv";
import Logger from "../middlewares/logger";

dotenv.config();

export const createHabit = async (req: IReq | any, res: Response) => {
  try {
    const newHabit = await Habit.create({
      owner: req.user[0]._id,
      name: req.body.name,
      color: "",
      sharedWith: [],
      firstDate: req.body.firstDate ?? "",
      lastDate: req.body.lastDate ?? "",
      dates: [],
    });

    await User.findOneAndUpdate(
      { _id: req.user[0]._id },
      {
        $push: { habits: [newHabit._id] },
      },
      { upsert: true }
    );

    res.status(200).json(newHabit);
  } catch (error) {
    Logger.error(error);
    return res.status(500).send(getErrorMessage(error));
  }
};
