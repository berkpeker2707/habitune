import axiosInstance from "../helpers/axios";
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import mime from "mime";
interface userTypes {
  token: string;
  loading: boolean;
  error: string;

  currentUserData: object;
  selectedUserData: object;
  deleteUserData: object;
  sendFeedbackData: string;
  changeThemeData: string;

  refreshUser: boolean;

  email: string;
  password: string;
  name: string;
  loginModalVisible: boolean;
  registerModalVisible: boolean;
  isUserUpdated: boolean;

  feedbackModalVisible: boolean;
  aboutUsModalVisible: boolean;
  feedback: string;

  acceptOrRemoveFriendModalVisible: boolean;
  selectedUser: {
    email: string;
    name: string;
    pending: boolean;
  };
  friendID: any;
  friendName: string;
}

const initialState: userTypes = {
  token: "",
  loading: false,
  error: "",

  currentUserData: {},
  selectedUserData: {},
  deleteUserData: {},
  sendFeedbackData: "",
  changeThemeData: "default",

  refreshUser: false,

  email: "",
  password: "",
  name: "",
  loginModalVisible: false,
  registerModalVisible: false,
  isUserUpdated: false,

  feedbackModalVisible: false,
  aboutUsModalVisible: false,
  feedback: "",

  acceptOrRemoveFriendModalVisible: false,
  selectedUser: { email: "", name: "", pending: false },
  friendID: 0,
  friendName: "",
};

const updatedUser = createAction("user/update");

export const signInWithGoogleAction = createAsyncThunk(
  "user/signInWithGoogle",
  async (userInfo: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`/user/google`, userInfo);

      return data;
    } catch (error) {
      console.log("signInWithGoogleAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const signInAction = createAsyncThunk(
  "user/signIn",
  async (userInfo: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`/user/signin`, userInfo);

      return data;
    } catch (error) {
      console.log("signInAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUserProfileAction = createAsyncThunk(
  "user/fetchCurrentUserProfile",
  async (today: number, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.get(
        `/user/profile/${today}`,
        config
      );

      return data;
    } catch (error) {
      console.log("fetchCurrentUserProfileAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfileAction = createAsyncThunk(
  "user/fetchUserProfile",
  async (
    fetchUserProfilePayload: {},
    { rejectWithValue, getState, dispatch }
  ) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
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
      console.log("fetchUserProfileAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateCurrentUserImageAction = createAsyncThunk(
  "user/updateCurrentUserImage",
  async (
    updateCurrentUserImagePayload: any,
    { rejectWithValue, getState, dispatch }
  ) => {
    // const uri = updateCurrentUserImagePayload.uri;
    const uri = updateCurrentUserImagePayload.assets[0].uri;
    const FormData = global.FormData;
    const formData = new FormData();

    const trimmedURI =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const fileName = trimmedURI.split("/").pop();

    formData.append("image", {
      name: fileName,
      type: mime.getType(trimmedURI),
      uri: trimmedURI,
    } as any);

    //get user token
    const auth = (getState() as RootState).user?.token;

    try {
      const { data } = await axiosInstance.post(
        `/user/update/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
          transformRequest: (data, headers) => {
            return formData;
          },
        }
      );

      return data;
    } catch (error) {
      console.log("updateCurrentUserImageAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const sendFeedbackAction = createAsyncThunk(
  "user/sendFeedback",
  async (sendFeedbackPayload: {}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/user/update/feedback`,
        sendFeedbackPayload,
        config
      );

      return data;
    } catch (error) {
      console.log("sendFeedbackAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const sendFriendshipAction = createAsyncThunk(
  "user/sendFriendship",
  async (sendFriendshipData: {}, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
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
      console.log("sendFriendshipAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const changeThemeAction = createAsyncThunk(
  "user/changeTheme",
  async (changeThemeData: "", { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/user/changeTheme`,
        changeThemeData,
        config
      );

      dispatch(updatedUser());

      return data;
    } catch (error) {
      console.log("changeThemeAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.delete(`/user/delete/me`, config);

      return data;
    } catch (error) {
      console.log("deleteUserAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const revertAll = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      await AsyncStorage.clear();

      return {};
    } catch (error) {
      console.log("revertAll: ", error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //login states starts
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLoginModalVisible: (state, action) => {
      state.loginModalVisible = action.payload;
    },
    setRegisterModalVisible: (state, action) => {
      state.registerModalVisible = action.payload;
    },
    //login states ends

    //refresh states starts
    setRefreshUser: (state, action) => {
      state.refreshUser = action.payload;
    },
    //refresh states ends

    //settings states starts
    setFeedbackModalVisible: (state, action) => {
      state.feedbackModalVisible = action.payload;
    },
    setAboutUsModalVisible: (state, action) => {
      state.aboutUsModalVisible = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    //settings states ends

    //friend states ends
    setAcceptOrRemoveFriendModalVisible: (state, action) => {
      state.acceptOrRemoveFriendModalVisible = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setFriendID: (state, action) => {
      state.friendID = action.payload;
    },
    setFriendName: (state, action) => {
      state.friendName = action.payload;
    },
    //friend states ends
  },
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
    //sign in with google reducer
    builder.addCase(signInAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.token = action?.payload;
    });
    builder.addCase(signInAction.rejected, (state, action) => {
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
    //update current user image reducer
    builder.addCase(updateCurrentUserImageAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateCurrentUserImageAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isUserUpdated = false;
      state.currentUserData = action?.payload;
    });
    builder.addCase(updateCurrentUserImageAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //send feedback reducer
    builder.addCase(sendFeedbackAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(sendFeedbackAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isUserUpdated = false;
      state.sendFeedbackData = action?.payload;
    });
    builder.addCase(sendFeedbackAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //change theme reducer
    builder.addCase(changeThemeAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(changeThemeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isUserUpdated = false;
      state.changeThemeData = action?.payload;
    });
    builder.addCase(changeThemeAction.rejected, (state, action) => {
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
      state.deleteUserData = {};
      state.sendFeedbackData = "";
      state.changeThemeData = "default";

      state.refreshUser = false;

      state.email = "";
      state.password = "";
      state.name = "";
      state.loginModalVisible = false;
      state.registerModalVisible = false;
      state.isUserUpdated = false;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
    //logout
    builder.addCase(revertAll.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revertAll.fulfilled, (initialState) => {
      initialState.token = "";
      initialState.loading = false;
      initialState.error = "";
      initialState.isUserUpdated = false;
      initialState.currentUserData = {};
      initialState.selectedUserData = {};
      initialState.deleteUserData = {};
      initialState.sendFeedbackData = "";
      initialState.changeThemeData = "default";
      initialState.email = "";
      initialState.password = "";
      initialState.name = "";
      initialState.loginModalVisible = false;
      initialState.registerModalVisible = false;
      initialState.isUserUpdated = false;
    });
    builder.addCase(revertAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
  },
});

//login states starts
export const {
  setEmail,
  setPassword,
  setName,
  setLoginModalVisible,
  setRegisterModalVisible,
} = userSlice.actions;
export const email = (state: any) => state.user.email;
export const password = (state: any) => state.user.password;

export const name = (state: any) => state.user.name;
export const loginModalVisible = (state: any) => state.user.loginModalVisible;
export const registerModalVisible = (state: any) =>
  state.user.registerModalVisible;
export const isUserUpdated = (state: any) => state.user.isUserUpdated;
//login states ends

//refresh states starts
export const { setRefreshUser } = userSlice.actions;
export const refreshUser = (state: any) => state.user.refreshUser;
//refresh states ends

//settings states starts
export const { setFeedbackModalVisible, setAboutUsModalVisible, setFeedback } =
  userSlice.actions;

export const feedbackModalVisible = (state: any) =>
  state.user.feedbackModalVisible;
export const aboutUsModalVisible = (state: any) =>
  state.user.aboutUsModalVisible;
export const feedback = (state: any) => state.user.feedback;
//settings states ends

//friend states ends
export const {
  setAcceptOrRemoveFriendModalVisible,
  setSelectedUser,
  setFriendID,
  setFriendName,
} = userSlice.actions;

export const acceptOrRemoveFriendModalVisible = (state: any) =>
  state.user.acceptOrRemoveFriendModalVisible;
export const selectedUser = (state: any) => state.user.selectedUser;
export const friendID = (state: any) => state.user.friendID;
export const friendName = (state: any) => state.user.friendName;
//friend states ends

export const selectUserLoading = (state: any) => state.user.loading;
export const selectUserError = (state: any) => state.user.error;
export const selectUserUpdated = (state: any) => state.user.isUserUpdated;
export const selectSignInWithGoogle = (state: any) => state.user.token;
export const selectSignIn = (state: any) => state.user.token;
export const selectFetchCurrentUserProfile = (state: any) =>
  state.user.currentUserData;
export const selectFetchUserProfile = (state: any) =>
  state.user.selectedUserData;
export const selectSendFriendship = (state: any) => state.user.currentUserData;
export const selectUpdateCurrentUserImage = (state: any) =>
  state.user.currentUserData;
export const selectSendFeedback = (state: any) => state.user.currentUserData;
export const selectChangeTheme = (state: any) =>
  state.user.currentUserData.theme;
export const selectDeleteUser = (state: any) => state.user.currentUserData;

export default userSlice.reducer;
