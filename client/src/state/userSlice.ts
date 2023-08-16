import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// var api_url: string;
// if (__DEV__) {
//   api_url = "http://192.168.1.33:1111/api";
// } else {
//   api_url = "https://habitune.vercel.app/api";
// }

interface userTypes {
  token: string;
  loading: boolean;
  error: string;
  isUserUpdated: boolean;
  healthData: string;
  signInWithGoogleData: object;
  callbackSignInWithGoogleData: object;
  fetchCurrentUserProfileData: object;
  fetchUserProfileData: object;
  sendFriendshipData: object;
  deleteUserData: object;
}

const initialState: userTypes = {
  token: "",
  loading: false,
  error: "",
  isUserUpdated: false,
  healthData: "",
  signInWithGoogleData: {},
  callbackSignInWithGoogleData: {},
  fetchCurrentUserProfileData: {},
  fetchUserProfileData: {},
  sendFriendshipData: {},
  deleteUserData: {},
};

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.33:1111/api",
  baseURL: "https://habitune.vercel.app/api",
});

const updatedUser = createAction("user/update");

export const healthAction = createAsyncThunk(
  "user/health",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get<any>(`http://192.168.1.33:1111/health`);

      // console.log("🚀 ~ file: userSlice.ts:51 ~ data:", data);

      return data;
    } catch (error) {
      // if (error.response) {
      //   console.log("first");
      //   // The request was made and the server responded with a status code
      //   // that falls out of the range of 2xx
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   console.log("second");
      //   // The request was made but no response was received
      //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //   // http.ClientRequest in node.js
      //   console.log(error.request);
      // } else {
      //   console.log("third");
      //   // Something happened in setting up the request that triggered an Error
      //   console.log("Error", error.message);
      // }
      // console.log(error.config);
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signInWithGoogleAction = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`/user/google`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const callbackSignInWithGoogleAction = createAsyncThunk(
  "user/callbackSignInWithGoogle",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`/user/google/callback`);

      await AsyncStorage.setItem("Token", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUserProfileAction = createAsyncThunk(
  "user/fetchCurrentUserProfile",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
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
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
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
  async (sendFriendshipData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/user/sendFriendshipRequest`,
        sendFriendshipData,
        config
      );

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
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
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
    builder.addCase(healthAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(healthAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.healthData = action?.payload;
    });
    builder.addCase(healthAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //sign in with google reducer
    builder.addCase(signInWithGoogleAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signInWithGoogleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.signInWithGoogleData = action?.payload;
    });
    builder.addCase(signInWithGoogleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //callback sign in with google reducer
    builder.addCase(callbackSignInWithGoogleAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      callbackSignInWithGoogleAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.callbackSignInWithGoogleData = action?.payload;
      }
    );
    builder.addCase(
      callbackSignInWithGoogleAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action?.error.toString();
      }
    );
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
        state.fetchCurrentUserProfileData = action?.payload;
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
      state.fetchUserProfileData = action?.payload;
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
      state.sendFriendshipData = action?.payload;
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
      state.loading = false;
      state.error = "";
      state.deleteUserData = action?.payload;
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
        (initialState.healthData = ""),
        (initialState.signInWithGoogleData = {}),
        (initialState.callbackSignInWithGoogleData = {}),
        (initialState.fetchCurrentUserProfileData = {});
      initialState.fetchUserProfileData = {};
      initialState.sendFriendshipData = {};
      initialState.deleteUserData = {};
    });
  },
});

export const selectPostLoading = (state: any) => state.user.loading;
export const selectPostError = (state: any) => state.user.error;
export const selectHealth = (state: any) => state.user.healthData;
export const selectSignInWithGoogle = (state: any) =>
  state.user.signInWithGoogleData;
export const selectCallbackSignInWithGoogle = (state: any) => {
  return state.user.callbackSignInWithGoogleData;
};
export const selectFetchCurrentUserProfile = (state: any) => {
  return state.user.fetchCurrentUserProfileData;
};
export const selectFetchUserProfile = (state: any) => {
  return state.user.fetchUserProfileData;
};
export const selectSendFriendship = (state: any) => {
  return state.user.sendFriendshipData;
};
export const selectDeleteUser = (state: any) => {
  return state.user.deleteUserData;
};

export default userSlice.reducer;
