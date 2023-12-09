import { fetchAllHabitsAction, setRefreshHabits } from "../../state/habitSlice";

//refresh current user habits starts
const refreshCurrentUsersHabits = (dispatch: Function) => {
  dispatch(setRefreshHabits(true));
  dispatch(fetchAllHabitsAction());
  setTimeout(() => {
    dispatch(setRefreshHabits(false));
  }, 2000);
};

export default refreshCurrentUsersHabits;
//refresh current user habits starts
