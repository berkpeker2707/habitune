import { Response } from 'express'
import { getErrorMessage } from '../../utils/errors.util'
import Habit from '../models/habit'

import { IReq } from '../../middlewares/interfaces'

import dotenv from 'dotenv'
import { errorLogger } from '../../middlewares/logger'
import isInArray from '../../middlewares/isInArray'

dotenv.config()

export const getFriendHabitWeekStreakBoolean = async (
  req: IReq | any,
  res: Response,
) => {
  try {
    var clientTime = parseInt(req.params.today)
    const loggedinUsersTodayHabits = await Habit.find({
      owner: req.params.friend,
    })
      .populate({ path: 'sharedWith', model: 'User' })
      .slice('dates', -10) //last 10 numbers of the dates array
      .slice('upcomingDates', -10)
      .exec()

    var currentHabitWeekStreakData
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 7
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 6
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 5
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 4
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
                new Date(clientTime).getSeconds(),
              ),
            ),
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 3
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
                new Date(clientTime).getSeconds(),
              ),
            ),
          ) &&
          isInArray(allHabitsItem.dates, new Date(clientTime))
        ) {
          return 2
        } else if (isInArray(allHabitsItem.dates, new Date(clientTime))) {
          return 1
        } else {
          return 0
        }
      },
    )

    return res.status(200).json(currentHabitWeekStreakData)
  } catch (error) {
    errorLogger.error(error)
    return res.status(500).send(getErrorMessage(error))
  }
}
