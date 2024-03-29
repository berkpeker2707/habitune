import axiosInstance from "../helpers/axios";
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface notificationTypes {
  token: string;
  loading: boolean;
  error: string;
  isNotificationUpdated: boolean;
  notificationData: object;
}

const initialState: notificationTypes = {
  token: "",
  loading: false,
  error: "",
  isNotificationUpdated: false,
  notificationData: {},
};

const updatedNotification = createAction("notification/update");

export const notificationUpdateTokenAction = createAsyncThunk(
  "notification/notificationUpdateToken",
  async (token: {}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.post(
        `/notification/update/token`,
        { token: token },
        config
      );

      return data;
    } catch (error) {
      console.log("notification error1: ", error);
      return rejectWithValue(error);
    }
  }
);

export const notificationSendAction = createAsyncThunk(
  "notification/notificationSend",
  async (notificationSendData: {}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.post(
        `/notification/update/push`,
        notificationSendData,
        config
      );

      return data;
    } catch (error) {
      console.log("notification error2: ", error);
      return rejectWithValue(error);
    }
  }
);

export const revertAllNotifications = createAsyncThunk(
  "notification/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      // await AsyncStorage.clear();

      return {};
    } catch (error) {
      console.log("notification error2: ", error);
      return rejectWithValue(error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //updated notification check reducer
    builder.addCase(updatedNotification, (state) => {
      state.isNotificationUpdated = true;
    });
    //fetch current notification profile reducer
    builder.addCase(notificationUpdateTokenAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      notificationUpdateTokenAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.notificationData = action?.payload;
      }
    );
    builder.addCase(notificationUpdateTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //logout
    builder.addCase(revertAllNotifications.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revertAllNotifications.fulfilled, (state, action) => {
      (state.token = ""),
        (state.loading = false),
        (state.error = ""),
        (state.isNotificationUpdated = false),
        (state.notificationData = {});
    });
    builder.addCase(revertAllNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
  },
});

export const selectNotificationLoading = (state: any) => {
  return state.notification.loading;
};
export const selectNotificationError = (state: any) => {
  return state.notification.error;
};
export const selectNotificationUpdated = (state: any) => {
  return state.notification.isNotificationUpdated;
};
export const selectNotificationUpdateToken = (state: any) => {
  return state.notification.notificationData;
};

export default notificationSlice.reducer;
