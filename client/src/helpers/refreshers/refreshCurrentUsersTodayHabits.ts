import {
  fetchAllTodayHabitsAction,
  setRefreshHabits,
  getTodaysHabitsBooleanAction,
} from "../../state/habitSlice";
import getCurrentDateAndTime from "../functions/getCurrentDateAndTime";

//refresh current users today habits starts
const refreshCurrentUsersTodayHabits = (dispatch: Function) => {
  dispatch(setRefreshHabits(true));
  dispatch(getTodaysHabitsBooleanAction(getCurrentDateAndTime().getTime()));
  dispatch(fetchAllTodayHabitsAction(getCurrentDateAndTime().getTime()));
  setTimeout(() => {
    dispatch(setRefreshHabits(false));
  }, 2000);
};

export default refreshCurrentUsersTodayHabits;
//refresh current users today habits ends
