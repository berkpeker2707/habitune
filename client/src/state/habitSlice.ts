import axiosInstance from "../helpers/axios";
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import isInCompletedDates from "../helpers/isInCompletedDates";
import isInArray from "../helpers/isInArray";

//date stuff starts
const todayTemp = new Date();
const today = new Date(
  todayTemp.getFullYear(),
  todayTemp.getMonth(),
  todayTemp.getDate(),
  todayTemp.getHours(),
  todayTemp.getMinutes(),
  todayTemp.getSeconds()
);
const OneDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 1,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
const TwoDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 2,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
const ThreeDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 3,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
const FourDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 4,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
const FiveDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 5,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
const SixDayAgo = new Date(
  new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate() - 6,
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ).getTime()
);
//date stuff ends
interface habitTypes {
  loading: boolean;
  error: string;
  isHabitUpdated: boolean;
  singleHabitData: object;
  totalHabitsData: Array<Object>;
  allHabitsOfSelectedUserData: Array<Object>;
  todaysHabitsData: Array<Object>;
  todaysHabitBooleanData: Array<boolean>;
  currentHabitWeekStreakData: Array<number>;
  friendCurrentHabitWeekData: Array<number>;
  allHabitDatesDotsData: Array<boolean>;
  friendAllHabitDatesDotsData: Array<boolean>;
  createHabitData: object;
  deleteHabitData: object;
  updateHabitNameData: object;
  updateHabitColorData: object;
  updateHabitSharedWithData: object;
  updateHabitFirstAndLastDateData: object;
  updateHabitDatesData: object;
  updateHabitCompletedDateData: object;

  //habit home states start
  refreshHabits: boolean;
  //habit home states ends

  //habit add states start
  taskUpcomingDates: string[];
  taskFirstDate: Date;
  taskLastDate: Date;
  dateBetweenModalOpen: boolean;
  openFrequency: boolean;
  openShareHabit: boolean;
  shareWithFriendList: string[];
  color: string;
  taskName: string;
  //habit add states ends

  //habit overview states starts
  selectedOverviewHabit: number;
  editHabitNameModal: boolean;
  overviewColorModal: boolean;
  shareWithFriendListModal: boolean;
  //habit overview states ends
}

const initialState: habitTypes = {
  loading: false,
  error: "",
  isHabitUpdated: false,
  singleHabitData: {},
  totalHabitsData: [],
  allHabitsOfSelectedUserData: [],
  todaysHabitsData: [],
  todaysHabitBooleanData: [],
  currentHabitWeekStreakData: [],
  friendCurrentHabitWeekData: [],
  allHabitDatesDotsData: [],
  friendAllHabitDatesDotsData: [],
  createHabitData: {},
  deleteHabitData: {},
  updateHabitNameData: {},
  updateHabitColorData: {},
  updateHabitSharedWithData: {},
  updateHabitFirstAndLastDateData: {},
  updateHabitDatesData: {},
  updateHabitCompletedDateData: {},

  //habit home states start
  refreshHabits: false,
  //habit home states ends

  //habit add states start
  taskFirstDate: new Date(
    todayTemp.getFullYear(),
    todayTemp.getMonth(),
    todayTemp.getDate(),
    todayTemp.getHours(),
    todayTemp.getMinutes(),
    todayTemp.getSeconds()
  ),
  taskLastDate: new Date(
    new Date(
      new Date(Date.now()).getFullYear() + 1,
      new Date(Date.now()).getMonth(),
      new Date(Date.now()).getDate(),
      new Date(Date.now()).getHours(),
      new Date(Date.now()).getMinutes(),
      new Date(Date.now()).getSeconds()
    )
  ),
  taskUpcomingDates: [],
  dateBetweenModalOpen: false,
  openFrequency: false,
  openShareHabit: false,
  shareWithFriendList: [],
  color: "#968EB0",
  taskName: "",
  //habit add states ends

  //habit overview states starts
  selectedOverviewHabit: 999,
  editHabitNameModal: false,
  overviewColorModal: false,
  shareWithFriendListModal: false,
  //habit overview states ends
};

const updatedHabit = createAction("habit/update");

export const createHabitAction = createAsyncThunk(
  "habit/createHabit",
  async (createHabitPayload: any, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/habit/new`,
        createHabitPayload,
        config
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

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("createHabitAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchAllHabitsAction = createAsyncThunk(
  "habit/fetchAllHabits",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.get(`/habit/all`, config);

      dispatch(getCurrentHabitWeekStreakBooleanAction(today.getTime()));
      dispatch(getAllHabitDatesDotsBooleanAction(today.getTime()));

      return data;
    } catch (error) {
      console.log("fetchAllHabitsAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchAllHabitsOfSelectedUserAction = createAsyncThunk(
  "habit/fetchAllHabitsOfSelectedUser",
  async (
    fetchAllHabitsOfSelectedUserPayload: {},
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
        `/habit/all/of/selected/user/${fetchAllHabitsOfSelectedUserPayload}`,
        config
      );

      dispatch(friendCurrentHabitWeekStreakAction(data));
      dispatch(friendAllHabitDatesDotsAction(data));

      return data;
    } catch (error) {
      console.log("fetchAllHabitsOfSelectedUserAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchAllTodayHabitsAction = createAsyncThunk(
  "habit/fetchAllTodayHabits",
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
        `/habit/all/today/${today}`,
        config
      );

      return data;
    } catch (error) {
      console.log("fetchAllTodayHabitsAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const getTodaysHabitsBooleanAction = createAsyncThunk(
  "habit/getTodaysHabitsBoolean",
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
        `/habit/home/boolean/${today}`,
        config
      );

      return data;
    } catch (error) {
      console.log("getTodaysHabitsBooleanAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const getCurrentHabitWeekStreakBooleanAction = createAsyncThunk(
  "habit/getCurrentHabitWeekStreakBoolean",
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
        `/habit/overview/streak/${today}`,
        config
      );

      return data;
    } catch (error) {
      console.log("getCurrentHabitWeekStreakBooleanAction: ", error);
      return rejectWithValue(error);
    }
  }
);

//x
export const friendCurrentHabitWeekStreakAction = createAsyncThunk(
  "habit/friendCurrentHabitWeekStreak",
  async (data: [], { rejectWithValue, getState, dispatch }) => {
    try {
      var friendCurrentHabitWeekData;

      friendCurrentHabitWeekData = data.map((allHabitsItem: any) => {
        if (
          isInArray(allHabitsItem.dates, SixDayAgo) &&
          isInArray(allHabitsItem.dates, FiveDayAgo) &&
          isInArray(allHabitsItem.dates, FourDayAgo) &&
          isInArray(allHabitsItem.dates, ThreeDayAgo) &&
          isInArray(allHabitsItem.dates, TwoDayAgo) &&
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 7;
        } else if (
          isInArray(allHabitsItem.dates, FiveDayAgo) &&
          isInArray(allHabitsItem.dates, FourDayAgo) &&
          isInArray(allHabitsItem.dates, ThreeDayAgo) &&
          isInArray(allHabitsItem.dates, TwoDayAgo) &&
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 6;
        } else if (
          isInArray(allHabitsItem.dates, FourDayAgo) &&
          isInArray(allHabitsItem.dates, ThreeDayAgo) &&
          isInArray(allHabitsItem.dates, TwoDayAgo) &&
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 5;
        } else if (
          isInArray(allHabitsItem.dates, ThreeDayAgo) &&
          isInArray(allHabitsItem.dates, TwoDayAgo) &&
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 4;
        } else if (
          isInArray(allHabitsItem.dates, TwoDayAgo) &&
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 3;
        } else if (
          isInArray(allHabitsItem.dates, OneDayAgo) &&
          isInArray(allHabitsItem.dates, today)
        ) {
          return 2;
        } else if (isInArray(allHabitsItem.dates, today)) {
          return 1;
        } else {
          return 0;
        }
      });

      return friendCurrentHabitWeekData;
    } catch (error) {
      console.log("friendCurrentHabitWeekStreakAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllHabitDatesDotsBooleanAction = createAsyncThunk(
  "habit/allHabitDatesDots",
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
        `/habit/overview/dots/${today}`,
        config
      );

      return data;
    } catch (error) {
      console.log("getAllHabitDatesDotsBooleanAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const friendAllHabitDatesDotsAction = createAsyncThunk(
  "habit/friendAllHabitDatesDots",
  async (data: [dates: any], { rejectWithValue, getState, dispatch }) => {
    try {
      var friendAllHabitDatesDotsData: Array<boolean> = [];

      for (var i = 0; i < data.length; i++) {
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, today));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, OneDayAgo));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, TwoDayAgo));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, ThreeDayAgo));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, FourDayAgo));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, FiveDayAgo));
        friendAllHabitDatesDotsData.push(isInArray(data[i].dates, SixDayAgo));
      }

      return friendAllHabitDatesDotsData;
    } catch (error) {
      console.log("friendAllHabitDatesDotsAction: ", error);
      return rejectWithValue(error);
    }
  }
);

//unused
export const fetchHabitAction = createAsyncThunk(
  "habit/fetchSingleHabit",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.get(`/habit/single`, config);

      return data;
    } catch (error) {
      console.log("fetchHabitAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteHabitAction = createAsyncThunk(
  "habit/deleteHabit",
  async (
    deleteHabitPayload: { _id: any },
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
      const { data } = await axiosInstance.delete(
        `/habit/delete/${deleteHabitPayload._id}`,
        config
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

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("deleteHabitAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitNameAction = createAsyncThunk(
  "habit/updateHabitName",
  async (
    updateHabitNamePayload: {},
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
      const { data } = await axiosInstance.put(
        `/habit/update/name`,
        updateHabitNamePayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitNameAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitColorAction = createAsyncThunk(
  "habit/updateHabitColor",
  async (
    updateHabitColorPayload: {},
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
      const { data } = await axiosInstance.put(
        `/habit/update/color`,
        updateHabitColorPayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitColorAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitSharedWithAction = createAsyncThunk(
  "habit/updateHabitSharedWith",
  async (
    updateHabitSharedPayload: {},
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
      const { data } = await axiosInstance.put(
        `/habit/update/share`,
        updateHabitSharedPayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitSharedWithAction: ", error);
      return rejectWithValue(error);
    }
  }
);

//unused
export const updateHabitFirstAndLastDateAction = createAsyncThunk(
  "habit/updateHabitFirstAndLastDate",
  async (
    updateHabitFirstAndLastDatePayload,
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
      const { data } = await axiosInstance.put(
        `/habit/update/firstAndLastDate`,
        updateHabitFirstAndLastDatePayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitFirstAndLastDateAction: ", error);
      return rejectWithValue(error);
    }
  }
);

//unused
export const updateHabitDatesAction = createAsyncThunk(
  "habit/updateHabitDates",
  async (updateHabitDatesPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/date`,
        updateHabitDatesPayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitDatesAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitCompletedDateAction = createAsyncThunk(
  "habit/updateHabitCompletedDate",
  async (
    updateHabitCompletedDatePayload: {},
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
      const { data } = await axiosInstance.put(
        `/habit/update/completed/date`,
        updateHabitCompletedDatePayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitCompletedDateAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitHiddenAction = createAsyncThunk(
  "habit/updateHabitHidden",
  async (
    updateHabitHiddenPayload: {},
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
      const { data } = await axiosInstance.put(
        `/habit/update/hidden`,
        updateHabitHiddenPayload,
        config
      );

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("updateHabitHiddenAction: ", error);
      return rejectWithValue(error);
    }
  }
);

export const revertAllHabit = createAsyncThunk(
  "habit/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      // await AsyncStorage.clear();

      return {};
    } catch (error) {
      console.log("revertAllHabit: ", error);
      return rejectWithValue(error);
    }
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    //habit home states start
    setRefreshHabits: (state, action) => {
      state.refreshHabits = action.payload;
    },
    //habit home states ends

    //habit add states start
    setTaskFirstDate: (state, action) => {
      state.taskFirstDate = action.payload;
    },
    setTaskLastDate: (state, action) => {
      state.taskLastDate = action.payload;
    },
    setTaskUpcomingDates: (state, action) => {
      state.taskUpcomingDates = action.payload;
    },
    setDateBetweenModalOpen: (state, action) => {
      state.dateBetweenModalOpen = action.payload;
    },
    setOpenFrequency: (state, action) => {
      state.openFrequency = action.payload;
    },
    setOpenShareHabit: (state, action) => {
      state.openShareHabit = action.payload;
    },
    setShareWithFriendList: (state, action) => {
      state.shareWithFriendList = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setTaskName: (state, action) => {
      state.taskName = action.payload;
    },
    //habit add states ends

    //habit overview states starts
    setSelectedOverviewHabit: (state, action) => {
      state.selectedOverviewHabit = action.payload;
    },
    setEditHabitNameModal: (state, action) => {
      state.editHabitNameModal = action.payload;
    },
    setOverviewColorModal: (state, action) => {
      state.overviewColorModal = action.payload;
    },
    setShareWithFriendListModal: (state, action) => {
      state.shareWithFriendListModal = action.payload;
    },

    //habit overview states ends
  },
  extraReducers: (builder) => {
    //updated check reducer
    builder.addCase(updatedHabit, (state) => {
      state.isHabitUpdated = true;
    });
    //create habit reducer
    builder.addCase(createHabitAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createHabitAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(createHabitAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //get all habits reducer
    builder.addCase(fetchAllHabitsAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllHabitsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.totalHabitsData = action?.payload;
    });
    builder.addCase(fetchAllHabitsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //fetch all habits of selected user reducer
    builder.addCase(fetchAllHabitsOfSelectedUserAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchAllHabitsOfSelectedUserAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.allHabitsOfSelectedUserData = action?.payload;
      }
    );
    builder.addCase(
      fetchAllHabitsOfSelectedUserAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //get all today habits reducer
    builder.addCase(fetchAllTodayHabitsAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllTodayHabitsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todaysHabitsData = action?.payload;
    });
    builder.addCase(fetchAllTodayHabitsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //todays habit completed boolean reducer
    builder.addCase(getTodaysHabitsBooleanAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTodaysHabitsBooleanAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todaysHabitBooleanData = action?.payload;
    });
    builder.addCase(getTodaysHabitsBooleanAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //current weeks habit streak reducer
    builder.addCase(getCurrentHabitWeekStreakBooleanAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getCurrentHabitWeekStreakBooleanAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentHabitWeekStreakData = action?.payload;
      }
    );
    builder.addCase(
      getCurrentHabitWeekStreakBooleanAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //friend current habit week streak reducer
    builder.addCase(friendCurrentHabitWeekStreakAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      friendCurrentHabitWeekStreakAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.friendCurrentHabitWeekData = action?.payload;
      }
    );
    builder.addCase(
      friendCurrentHabitWeekStreakAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //all habit dates dots reducer
    builder.addCase(getAllHabitDatesDotsBooleanAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getAllHabitDatesDotsBooleanAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.allHabitDatesDotsData = action?.payload;
      }
    );
    builder.addCase(
      getAllHabitDatesDotsBooleanAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //friend all habit dates dots action reducer
    builder.addCase(friendAllHabitDatesDotsAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      friendAllHabitDatesDotsAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.friendAllHabitDatesDotsData = action?.payload;
      }
    );
    builder.addCase(friendAllHabitDatesDotsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //get single habit reducer
    builder.addCase(fetchHabitAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchHabitAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
    });
    builder.addCase(fetchHabitAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //delete habit reducer
    builder.addCase(deleteHabitAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteHabitAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(deleteHabitAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //update habit name reducer
    builder.addCase(updateHabitNameAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHabitNameAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(updateHabitNameAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //update habit color reducer
    builder.addCase(updateHabitColorAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHabitColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(updateHabitColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //update habit shared with reducer
    builder.addCase(updateHabitSharedWithAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHabitSharedWithAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(updateHabitSharedWithAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //update habit first and last date reducer
    builder.addCase(updateHabitFirstAndLastDateAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      updateHabitFirstAndLastDateAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.singleHabitData = action?.payload;
        state.isHabitUpdated = false;
      }
    );
    builder.addCase(
      updateHabitFirstAndLastDateAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //update habit dates reducer
    builder.addCase(updateHabitDatesAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHabitDatesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(updateHabitDatesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //update habit completed date reducer
    builder.addCase(updateHabitCompletedDateAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      updateHabitCompletedDateAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.singleHabitData = action?.payload;
        state.isHabitUpdated = false;
      }
    );
    builder.addCase(
      updateHabitCompletedDateAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.toString();
      }
    );
    //update habit hidden reducer
    builder.addCase(updateHabitHiddenAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHabitHiddenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singleHabitData = action?.payload;
      state.isHabitUpdated = false;
    });
    builder.addCase(updateHabitHiddenAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //logout
    builder.addCase(revertAllHabit.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revertAllHabit.fulfilled, (state, action) => {
      (state.loading = false),
        (state.error = ""),
        (state.isHabitUpdated = false),
        (state.singleHabitData = {}),
        (state.totalHabitsData = []),
        (state.allHabitsOfSelectedUserData = []),
        (state.todaysHabitsData = []),
        (state.todaysHabitBooleanData = []),
        (state.currentHabitWeekStreakData = []),
        (state.friendCurrentHabitWeekData = []),
        (state.allHabitDatesDotsData = []),
        (state.friendAllHabitDatesDotsData = []),
        (state.createHabitData = {}),
        (state.deleteHabitData = {}),
        (state.updateHabitNameData = {}),
        (state.updateHabitColorData = {}),
        (state.updateHabitSharedWithData = {}),
        (state.updateHabitFirstAndLastDateData = {}),
        (state.updateHabitDatesData = {}),
        (state.updateHabitCompletedDateData = {}),
        //habit home states start
        (state.refreshHabits = false),
        //habit home states ends

        //habit add states start
        (state.taskFirstDate = new Date(
          todayTemp.getFullYear(),
          todayTemp.getMonth(),
          todayTemp.getDate(),
          todayTemp.getHours(),
          todayTemp.getMinutes(),
          todayTemp.getSeconds()
        )),
        (state.taskLastDate = new Date(
          new Date(
            new Date(Date.now()).getFullYear() + 1,
            new Date(Date.now()).getMonth(),
            new Date(Date.now()).getDate(),
            new Date(Date.now()).getHours(),
            new Date(Date.now()).getMinutes(),
            new Date(Date.now()).getSeconds()
          )
        )),
        (state.taskUpcomingDates = []),
        (state.dateBetweenModalOpen = false),
        (state.openFrequency = false),
        (state.openShareHabit = false),
        (state.shareWithFriendList = []),
        (state.color = "#968EB0"),
        (state.taskName = ""),
        //habit add states ends

        //habit overview states starts
        (state.selectedOverviewHabit = 999),
        (state.editHabitNameModal = false),
        (state.overviewColorModal = false),
        (state.shareWithFriendListModal = false);
      //habit overview states ends
    });
    builder.addCase(revertAllHabit.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
  },
});

//habit home states start
export const { setRefreshHabits } = habitSlice.actions;
export const refreshHabits = (state: any) => state.habit.refreshHabits;
//habit home states ends

//habit add states start
export const {
  setTaskFirstDate,
  setTaskLastDate,
  setTaskUpcomingDates,
  setDateBetweenModalOpen,
  setOpenFrequency,
  setOpenShareHabit,
  setShareWithFriendList,
  setColor,
  setTaskName,
} = habitSlice.actions;
export const taskFirstDate = (state: any) => state.habit.taskFirstDate;
export const taskLastDate = (state: any) => state.habit.taskLastDate;
export const taskUpcomingDates = (state: any) => state.habit.taskUpcomingDates;
export const dateBetweenModalOpen = (state: any) =>
  state.habit.dateBetweenModalOpen;
export const openFrequency = (state: any) => state.habit.openFrequency;
export const openShareHabit = (state: any) => state.habit.openShareHabit;
export const shareWithFriendList = (state: any) =>
  state.habit.shareWithFriendList;
export const color = (state: any) => state.habit.color;
export const taskName = (state: any) => state.habit.taskName;
//habit add states ends

//habit overview states starts
export const {
  setSelectedOverviewHabit,
  setEditHabitNameModal,
  setOverviewColorModal,
  setShareWithFriendListModal,
} = habitSlice.actions;
export const selectedOverviewHabit = (state: any) =>
  state.habit.selectedOverviewHabit;
export const editHabitNameModal = (state: any) =>
  state.habit.editHabitNameModal;
export const overviewColorModal = (state: any) =>
  state.habit.overviewColorModal;
export const shareWithFriendListModal = (state: any) =>
  state.habit.shareWithFriendListModal;

//habit overview states ends

export const selectHabitLoading = (state: any) => state.habit.loading;
export const selectPostError = (state: any) => state.habit.error;
export const selectHabitUpdated = (state: any) => state.habit.isHabitUpdated;
export const selectCreateHabit = (state: any) => state.habit.singleHabitData;
export const selectHabits = (state: any) => state.habit.totalHabitsData;
export const allHabitsNumber = (state: any) =>
  state.habit.totalHabitsData.length;
export const selectHabitsOfSelectedUser = (state: any) =>
  state.habit.allHabitsOfSelectedUserData;
export const allHabitsOfSelectedUserNumber = (state: any) =>
  state.habit.allHabitsOfSelectedUserData.length;
export const selectHabitsToday = (state: any) => state.habit.todaysHabitsData;
export const allHabitsTodayNumber = (state: any) =>
  state.habit.todaysHabitsData.length;
export const selectHabitsTodayBoolean = (state: any) =>
  state.habit.todaysHabitBooleanData;
export const selectCurrentHabitWeekStreak = (state: any) =>
  state.habit.currentHabitWeekStreakData;
export const selectFriendCurrentHabitWeekStreak = (state: any) =>
  state.habit.friendCurrentHabitWeekData;
export const selectAllHabitDatesDots = (state: any) =>
  state.habit.allHabitDatesDotsData;
export const selectFriendAllHabitDatesDots = (state: any) =>
  state.habit.friendAllHabitDatesDotsData;
export const selectHabit = (state: any) => state.habit.singleHabitData;
export const selectDeleteHabit = (state: any) => state.habit.singleHabitData;
export const selectUpdateHabitName = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitColor = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitSharedWith = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitFirstAndLastDate = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitDates = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitCompletedDate = (state: any) =>
  state.habit.singleHabitData;
export const selectUpdateHabitHidden = (state: any) =>
  state.habit.singleHabitData;

export default habitSlice.reducer;
