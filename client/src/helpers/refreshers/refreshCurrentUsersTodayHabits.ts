import {
  fetchAllTodayHabitsAction,
  setRefreshHabits,
  setTempBarFilled,
} from "../../state/habitSlice";

//refresh current users today habits starts
const refreshCurrentUsersTodayHabits = (
  dispatch: Function,
  habitsTodayBoolean: []
) => {
  dispatch(setRefreshHabits(true));
  dispatch(setTempBarFilled(() => [...habitsTodayBoolean]));
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
