import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

var api_url: string;
if (__DEV__) {
  api_url = "http://localhost:1111/api";
} else {
  api_url = "https://waipe-server.azurewebsites.net/api";
}

interface habitTypes {
  loading: boolean;
  error: string;
  isUpdated: boolean;
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
  isUpdated: false,
  createHabitData: {},
  deleteHabitData: {},
  updateHabitColorData: {},
  updateHabitSharedWithData: {},
  updateHabitFirstAndLastDateData: {},
  updateHabitDatesData: {},
  updateHabitCompletedDateData: {},
};

const updatedHabit = createAction("habit/update");

export const createHabitAction = createAsyncThunk(
  "habit/createHabit",
  async (createHabitPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${api_url}/habit/new`,
        createHabitPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const deleteHabitAction = createAsyncThunk(
  "habit/deleteHabit",
  async (deleteHabitPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${api_url}/habit/delete`,
        deleteHabitPayload,
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
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${api_url}/habit/update/color`,
        updateHabitColorPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const updateHabitSharedWithAction = createAsyncThunk(
  "habit/updateHabitSharedWith",
  async (updateHabitSharedPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${api_url}/habit/update/share`,
        updateHabitSharedPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
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
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${api_url}/habit/update/firstAndLastDate`,
        updateHabitFirstAndLastDatePayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

export const updateHabitDatesAction = createAsyncThunk(
  "habit/updateHabitDates",
  async (updateHabitDatesPayload, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${api_url}/habit/update/date`,
        updateHabitDatesPayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
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
    const auth = getState()?.user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${api_url}/habit/update/completed/date`,
        updateHabitCompletedDatePayload,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.reponse?.data);
    }
  }
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  extraReducers: (builder) => {
    //updated check reducer
    builder.addCase(updatedHabit, (state) => {
      state.isUpdated = true;
    });
    //create habit reducer
    builder.addCase(createHabitAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createHabitAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.createHabitData = action?.payload;
    });
    builder.addCase(createHabitAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });

    //delete habit reducer
    builder.addCase(deleteHabitAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteHabitAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.deleteHabitData = action?.payload;
    });
    builder.addCase(deleteHabitAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });

    //update habit color reducer
    builder.addCase(updateHabitColorAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateHabitColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateHabitColorData = action?.payload;
    });
    builder.addCase(updateHabitColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });

    //update habit shared with reducer
    builder.addCase(updateHabitSharedWithAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateHabitSharedWithAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateHabitSharedWithData = action?.payload;
    });
    builder.addCase(updateHabitSharedWithAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });

    //update habit first and last date reducer
    builder.addCase(updateHabitFirstAndLastDateAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateHabitFirstAndLastDateAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = null;
        state.updateHabitFirstAndLastDateData = action?.payload;
      }
    );
    builder.addCase(
      updateHabitFirstAndLastDateAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action?.error;
      }
    );

    //update habit dates reducer
    builder.addCase(updateHabitDatesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateHabitDatesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateHabitDatesData = action?.payload;
    });
    builder.addCase(updateHabitDatesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error;
    });

    //update habit completed date reducer
    builder.addCase(updateHabitCompletedDateAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateHabitCompletedDateAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = null;
        state.updateHabitCompletedDateData = action?.payload;
      }
    );
    builder.addCase(
      updateHabitCompletedDateAction.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action?.error;
      }
    );
  },
});

export const selectPostLoading = (state) => state.habit.loading;
export const selectPostError = (state) => state.habit.error;
export const selectCreateHabit = (state) => state.habit.createHabitData;
export const selectDeleteHabit = (state) => {
  return state.habit.deleteHabitData;
};
export const selectUpdateHabitColor = (state) => {
  return state.habit.updateHabitColorData;
};
export const selectUpdateHabitSharedWith = (state) => {
  return state.habit.updateHabitSharedWithData;
};
export const selectUpdateHabitFirstAndLastDate = (state) => {
  return state.habit.updateHabitFirstAndLastDateData;
};
export const selectUpdateHabitDates = (state) => {
  return state.habit.updateHabitDatesData;
};
export const selectUpdateHabitCompletedDate = (state) => {
  return state.habit.updateHabitCompletedDateData;
};

export default habitSlice.reducer;
