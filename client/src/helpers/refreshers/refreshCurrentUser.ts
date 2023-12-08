import {
  fetchCurrentUserProfileAction,
  setRefreshUser,
} from "../../state/userSlice";

//refresh current user starts
const refreshCurrentUser = (dispatch: Function) => {
  dispatch(setRefreshUser(true));
  dispatch(
    fetchCurrentUserProfileAction(
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
    dispatch(setRefreshUser(false));
  }, 2000);
};

export default refreshCurrentUser;
//refresh current user ends
