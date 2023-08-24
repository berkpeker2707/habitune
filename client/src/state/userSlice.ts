import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// var api_url: string;
// if (__DEV__) {
//   api_url = "http://192.168.1.37:1111/api";
// } else {
//   api_url = "https://www.habitune.net/api";
// }

interface userTypes {
  token: string;
  loading: boolean;
  error: string;
  isUserUpdated: boolean;
  auth: string;
  currentUserData: object;
  selectedUserData: object;

  deleteUserData: object;
}

const initialState: userTypes = {
  token: "",
  loading: false,
  error: "",
  isUserUpdated: false,
  auth: "",
  currentUserData: {},
  selectedUserData: {},
  deleteUserData: {},
};

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.66:1111/api",
  baseURL: "https://www.habitune.net/api",
});

const updatedUser = createAction("user/update");

export const signInWithGoogleAction = createAsyncThunk(
  "user/signInWithGoogle",
  async (userInfo: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`/user/google`, userInfo);

      await AsyncStorage.setItem("Token", JSON.stringify(data.accessToken));

      return data.accessToken;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUserProfileAction = createAsyncThunk(
  "user/fetchCurrentUserProfile",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.get(`/user/profile`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfileAction = createAsyncThunk(
  "user/fetchUserProfile",
  async (fetchUserProfilePayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.get(
        `/user/selectedUser/profile/${fetchUserProfilePayload}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendFriendshipAction = createAsyncThunk(
  "user/sendFriendship",
  async (sendFriendshipData: {}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/user/sendFriendshipRequest`,
        sendFriendshipData,
        config
      );

      dispatch(updatedUser());

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.delete(`/user/delete/me`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const revertAll = createAction("revertAll");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //updated user check reducer
    builder.addCase(updatedUser, (state) => {
      state.isUserUpdated = true;
    });
    //sign in with google reducer
    builder.addCase(signInWithGoogleAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signInWithGoogleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.token = action?.payload;
    });
    builder.addCase(signInWithGoogleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //fetch current user profile reducer
    builder.addCase(fetchCurrentUserProfileAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchCurrentUserProfileAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentUserData = action?.payload;
      }
    );
    builder.addCase(fetchCurrentUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //fetch user profile reducer
    builder.addCase(fetchUserProfileAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.selectedUserData = action?.payload;
    });
    builder.addCase(fetchUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //send friendship reducer
    builder.addCase(sendFriendshipAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(sendFriendshipAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isUserUpdated = false;
      state.currentUserData = action?.payload;
    });
    builder.addCase(sendFriendshipAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //delete user reducer
    builder.addCase(deleteUserAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.token = "";
      state.loading = false;
      state.error = "";
      state.isUserUpdated = false;
      state.currentUserData = {};
      state.selectedUserData = {};
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //logout
    builder.addCase(revertAll, (initialState) => {
      (initialState.token = ""),
        (initialState.loading = false),
        (initialState.error = ""),
        (initialState.isUserUpdated = false),
        (initialState.currentUserData = {});
      initialState.selectedUserData = {};
    });
  },
});

export const selectUserLoading = (state: any) => state.user.loading;
export const selectUserError = (state: any) => state.user.error;
export const selectUserUpdated = (state: any) => state.user.isUserUpdated;
export const selectSignInWithGoogle = (state: any) => state.user.token;
export const selectFetchCurrentUserProfile = (state: any) => {
  return state.user.currentUserData;
};
export const selectFetchUserProfile = (state: any) => {
  return state.user.selectedUserData;
};

export default userSlice.reducer;
