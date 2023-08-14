import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

// var api_url: string;
// if (__DEV__) {
//   api_url = "http://192.168.1.33:1111/api";
// } else {
//   api_url = "https://habitune.vercel.app/api";
// }

interface habitTypes {
  loading: boolean;
  error: string;
  isHabitUpdated: boolean;
  createHabitData: object;
  deleteHabitData: object;
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
  createHabitData: {},
  deleteHabitData: {},
  updateHabitColorData: {},
  updateHabitSharedWithData: {},
  updateHabitFirstAndLastDateData: {},
  updateHabitDatesData: {},
  updateHabitCompletedDateData: {},
};

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.33:1111/api",
  baseURL: "https://habitune.vercel.app/api",
});

const updatedHabit = createAction("habit/update");

export const createHabitAction = createAsyncThunk(
  "habit/createHabit",
  async (createHabitPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.post(
        `/habit/new`,
        createHabitPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteHabitAction = createAsyncThunk(
  "habit/deleteHabit",
  async (deleteHabitPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.delete(
        `/habit/delete`,
        // deleteHabitPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateHabitColorAction = createAsyncThunk(
  "habit/updateHabitColor",
  async (updateHabitColorPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/color`,
        updateHabitColorPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateHabitSharedWithAction = createAsyncThunk(
  "habit/updateHabitSharedWith",
  async (updateHabitSharedPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/share`,
        updateHabitSharedPayload,
        config
      );

      return data;
    } catch (error) {
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
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/firstAndLastDate`,
        updateHabitFirstAndLastDatePayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateHabitDatesAction = createAsyncThunk(
  "habit/updateHabitDates",
  async (updateHabitDatesPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/date`,
        updateHabitDatesPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateHabitCompletedDateAction = createAsyncThunk(
  "habit/updateHabitCompletedDate",
  async (
    updateHabitCompletedDatePayload,
    { rejectWithValue, getState, dispatch }
  ) => {
    //get user token
    const auth = (getState() as RootState).user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axiosInstance.put(
        `/habit/update/completed/date`,
        updateHabitCompletedDatePayload,
        config
      );

      return data;
    } catch (error) {
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
      state.createHabitData = action?.payload;
    });
    builder.addCase(createHabitAction.rejected, (state, action) => {
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
      state.deleteHabitData = action?.payload;
    });
    builder.addCase(deleteHabitAction.rejected, (state, action) => {
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
      state.updateHabitColorData = action?.payload;
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
      state.updateHabitSharedWithData = action?.payload;
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
        state.updateHabitFirstAndLastDateData = action?.payload;
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
      state.updateHabitDatesData = action?.payload;
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
        state.updateHabitCompletedDateData = action?.payload;
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

export const selectPostLoading = (state: any) => state.habit.loading;
export const selectPostError = (state: any) => state.habit.error;
export const selectCreateHabit = (state: any) => state.habit.createHabitData;
export const selectDeleteHabit = (state: any) => {
  return state.habit.deleteHabitData;
};
export const selectUpdateHabitColor = (state: any) => {
  return state.habit.updateHabitColorData;
};
export const selectUpdateHabitSharedWith = (state: any) => {
  return state.habit.updateHabitSharedWithData;
};
export const selectUpdateHabitFirstAndLastDate = (state: any) => {
  return state.habit.updateHabitFirstAndLastDateData;
};
export const selectUpdateHabitDates = (state: any) => {
  return state.habit.updateHabitDatesData;
};
export const selectUpdateHabitCompletedDate = (state: any) => {
  return state.habit.updateHabitCompletedDateData;
};

export default habitSlice.reducer;
