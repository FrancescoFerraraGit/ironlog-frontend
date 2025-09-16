import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWorkouts, deleteWorkout as deleteWorkoutApi } from "../../api/workouts";

// GET schede
export const getWorkouts = createAsyncThunk(
  "workouts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await fetchWorkouts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Errore nel fetch workouts");
    }
  }
);

// DELETE scheda
export const deleteWorkout = createAsyncThunk(
  "workouts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token nel thunk deleteWorkout:", token);
      return await deleteWorkoutApi(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Errore nella cancellazione");
    }
  }
);

const workoutSlice = createSlice({
  name: "workouts",
  initialState: {
    workouts: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetWorkouts: (state) => {
      state.workouts = [];
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getWorkouts.pending, (state) => { state.isLoading = true; })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workouts = action.payload;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // DELETE
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.meta.arg
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;
