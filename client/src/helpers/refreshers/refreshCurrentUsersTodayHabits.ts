import {
  fetchAllTodayHabitsAction,
  setRefreshHabits,
  todaysHabitBooleanAction,
} from "../../state/habitSlice";

//refresh current users today habits starts
const refreshCurrentUsersTodayHabits = (dispatch: Function) => {
  dispatch(setRefreshHabits(true));
  dispatch(
    todaysHabitBooleanAction(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ).getTime()
    )
  );
  dispatch(
    fetchAllTodayHabitsAction(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ).getTime()
    )
  );
  setTimeout(() => {
    dispatch(setRefreshHabits(false));
  }, 2000);
};

export default refreshCurrentUsersTodayHabits;
//refresh current users today habits ends
