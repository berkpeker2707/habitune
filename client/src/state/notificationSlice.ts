import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
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

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.66:1111/api",
  baseURL: "https://www.habitune.net/api",
});

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
      const { data } = await axiosInstance.put(
        `/notification/update/push`,
        notificationSendData,
        config
      );

      return data;
    } catch (error) {
      console.log("notification error1: ", error);
      return rejectWithValue(error);
    }
  }
);

export const revertAll = createAsyncThunk(
  "notification/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      await AsyncStorage.clear();

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
    builder.addCase(revertAll.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revertAll.fulfilled, (initialState) => {
      (initialState.token = ""),
        (initialState.loading = false),
        (initialState.error = ""),
        (initialState.isNotificationUpdated = false),
        (initialState.notificationData = {});
    });
    builder.addCase(revertAll.rejected, (state, action) => {
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
