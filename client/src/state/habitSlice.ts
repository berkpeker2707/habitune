import axiosInstance from "../helpers/axios";
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import isInCompletedDates from "../helpers/isInCompletedDates";

interface habitTypes {
  loading: boolean;
  error: string;
  isHabitUpdated: boolean;
  singleHabitData: object;
  totalHabitsData: Array<Object>;
  allHabitsOfSelectedUserData: Array<Object>;
  todaysHabitsData: Array<Object>;
  todaysHabitBooleanData: Array<boolean>;
  createHabitData: object;
  deleteHabitData: object;
  updateHabitNameData: object;
  updateHabitColorData: object;
  updateHabitSharedWithData: object;
  updateHabitFirstAndLastDateData: object;
  updateHabitDatesData: object;
  updateHabitCompletedDateData: object;
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
  createHabitData: {},
  deleteHabitData: {},
  updateHabitNameData: {},
  updateHabitColorData: {},
  updateHabitSharedWithData: {},
  updateHabitFirstAndLastDateData: {},
  updateHabitDatesData: {},
  updateHabitCompletedDateData: {},
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

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("habit error1: ", error);
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

      return data;
    } catch (error) {
      console.log("habit error2: ", error);
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

      return data;
    } catch (error) {
      console.log("habit error2: ", error);
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

      dispatch(todaysHabitBooleanAction(data));

      return data;
    } catch (error) {
      console.log("habit error3: ", error);
      return rejectWithValue(error);
    }
  }
);

export const todaysHabitBooleanAction = createAsyncThunk(
  "habit/updateTodaysHabitBoolean",
  async (data: [], { rejectWithValue, getState, dispatch }) => {
    try {
      var todaysHabitBooleanData;

      todaysHabitBooleanData = data.map((allHabitsItem: any) => {
        return isInCompletedDates(
          allHabitsItem.dates,
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          )
        );
      });

      return todaysHabitBooleanData;
    } catch (error) {
      console.log("habit error12: ", error);
      return rejectWithValue(error);
    }
  }
);

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
      console.log("habit error4: ", error);
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

      dispatch(updatedHabit());

      return data;
    } catch (error) {
      console.log("habit error5: ", error);
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
      console.log("habit error6: ", error);
      return rejectWithValue(error);
    }
  }
);

export const updateHabitColorAction = createAsyncThunk(
  "habit/updateHabitColor",
  async (updateHabitColorPayload, { rejectWithValue, getState, dispatch }) => {
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
      console.log("habit error7: ", error);
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
      console.log("habit error8: ", error);
      return rejectWithValue(error);
    }
  }
);

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
      console.log("habit error9: ", error);
      return rejectWithValue(error);
    }
  }
);

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
      console.log("habit error10: ", error);
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
      console.log("habit error11: ", error);
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
      console.log("habit error12: ", error);
      return rejectWithValue(error);
    }
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
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
    builder.addCase(todaysHabitBooleanAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(todaysHabitBooleanAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todaysHabitBooleanData = action?.payload;
    });
    builder.addCase(todaysHabitBooleanAction.rejected, (state, action) => {
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
    //logout
    builder.addCase(revertAllHabit.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revertAllHabit.fulfilled, (initialState) => {
      (initialState.loading = false),
        (initialState.error = ""),
        (initialState.isHabitUpdated = false),
        (initialState.singleHabitData = {});
      initialState.totalHabitsData = [];
      initialState.todaysHabitsData = [];
    });
    builder.addCase(revertAllHabit.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error.toString();
    });
  },
});

export const selectHabitLoading = (state: any) => {
  return state.habit.loading;
};
export const selectPostError = (state: any) => {
  return state.habit.error;
};
export const selectHabitUpdated = (state: any) => {
  return state.habit.isHabitUpdated;
};
export const selectCreateHabit = (state: any) => {
  // return state.habit.createHabitData;
  return state.habit.singleHabitData;
};
export const selectHabits = (state: any) => {
  return state.habit.totalHabitsData;
};
export const selectHabitsOfSelectedUser = (state: any) => {
  return state.habit.allHabitsOfSelectedUserData;
};
export const selectHabitsToday = (state: any) => {
  return state.habit.todaysHabitsData;
};
export const selectHabitsTodayBoolean = (state: any) => {
  return state.habit.todaysHabitBooleanData;
};
export const selectHabit = (state: any) => {
  return state.habit.singleHabitData;
};
export const selectDeleteHabit = (state: any) => {
  // return state.habit.deleteHabitData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitName = (state: any) => {
  // return state.habit.updateHabitNameData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitColor = (state: any) => {
  // return state.habit.updateHabitColorData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitSharedWith = (state: any) => {
  // return state.habit.updateHabitSharedWithData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitFirstAndLastDate = (state: any) => {
  // return state.habit.updateHabitFirstAndLastDateData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitDates = (state: any) => {
  // return state.habit.updateHabitDatesData;
  return state.habit.singleHabitData;
};
export const selectUpdateHabitCompletedDate = (state: any) => {
  // return state.habit.updateHabitCompletedDateData;
  return state.habit.singleHabitData;
};

export default habitSlice.reducer;
