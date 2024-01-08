import {
  fetchCurrentUserProfileAction,
  setRefreshUser,
} from "../../state/userSlice";
import getCurrentDateAndTime from "../functions/getCurrentDateAndTime";

//refresh current user starts
const refreshCurrentUser = (dispatch: Function) => {
  dispatch(setRefreshUser(true));
  dispatch(fetchCurrentUserProfileAction(getCurrentDateAndTime().getTime()));
  setTimeout(() => {
    dispatch(setRefreshUser(false));
  }, 2000);
};

export default refreshCurrentUser;
//refresh current user ends
