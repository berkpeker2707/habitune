import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

// var api_url: string;
// if (__DEV__) {
//   api_url = "http://192.168.1.37:1111/api";
// } else {
//   api_url = "https://www.habitune.net/api";
// }

interface habitTypes {
  token: string;
  loading: boolean;
  error: string;
  isHabitUpdated: boolean;
  habitData: object;
  habitsAllData: Array<Object>;
  habitsData: Array<Object>;
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
  token: "",
  loading: false,
  error: "",
  isHabitUpdated: false,
  habitData: {},
  habitsAllData: [],
  habitsData: [],
  createHabitData: {},
  deleteHabitData: {},
  updateHabitNameData: {},
  updateHabitColorData: {},
  updateHabitSharedWithData: {},
  updateHabitFirstAndLastDateData: {},
  updateHabitDatesData: {},
  updateHabitCompletedDateData: {},
};

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.33:1111/api",
  baseURL: "https://www.habitune.net/api",
});

const updatedHabit = createAction("habit/update");

export const createHabitAction = createAsyncThunk(
  "habit/createHabit",
  async (createHabitPayload: any, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;

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

export const fetchAllTodayHabitsAction = createAsyncThunk(
  "habit/fetchAllTodayHabits",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const { data } = await axiosInstance.get(`/habit/all/today`, config);

      return data;
    } catch (error) {
      console.log("habit error3: ", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchHabitAction = createAsyncThunk(
  "habit/fetchSingleHabit",
  async (_, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;

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
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;
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
  async (updateHabitSharedPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;
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
    const auth = (getState() as RootState).user.token;
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
      state.habitData = action?.payload;
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
      state.habitsAllData = action?.payload;
    });
    builder.addCase(fetchAllHabitsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.toString();
    });
    //get all today habits reducer
    builder.addCase(fetchAllTodayHabitsAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllTodayHabitsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.habitsData = action?.payload;
    });
    builder.addCase(fetchAllTodayHabitsAction.rejected, (state, action) => {
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
      state.habitData = action?.payload;
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
      state.habitData = action?.payload;
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
      state.habitData = action?.payload;
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
      state.habitData = action?.payload;
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
      state.habitData = action?.payload;
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
        state.habitData = action?.payload;
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
      state.habitData = action?.payload;
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
        state.habitData = action?.payload;
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
  return state.habit.habitData;
};
export const selectHabits = (state: any) => {
  return state.habit.habitsAllData;
};
export const selectHabitsToday = (state: any) => {
  return state.habit.habitsData;
};
export const selectHabit = (state: any) => {
  return state.habit.habitData;
};
export const selectDeleteHabit = (state: any) => {
  // return state.habit.deleteHabitData;
  return state.habit.habitData;
};
export const selectUpdateHabitName = (state: any) => {
  // return state.habit.updateHabitNameData;
  return state.habit.habitData;
};
export const selectUpdateHabitColor = (state: any) => {
  // return state.habit.updateHabitColorData;
  return state.habit.habitData;
};
export const selectUpdateHabitSharedWith = (state: any) => {
  // return state.habit.updateHabitSharedWithData;
  return state.habit.habitData;
};
export const selectUpdateHabitFirstAndLastDate = (state: any) => {
  // return state.habit.updateHabitFirstAndLastDateData;
  return state.habit.habitData;
};
export const selectUpdateHabitDates = (state: any) => {
  // return state.habit.updateHabitDatesData;
  return state.habit.habitData;
};
export const selectUpdateHabitCompletedDate = (state: any) => {
  // return state.habit.updateHabitCompletedDateData;
  return state.habit.habitData;
};

export default habitSlice.reducer;
