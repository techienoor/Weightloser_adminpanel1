import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { set, findIndex } from "lodash";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const initialState = {
  data: [],
  plans: [],
  showAddForm: false,
  planId: null,
};

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    try {
      const { data: res } = await api.get(API_URLS.exercise.list);
      return res.plans;
    } catch (ex) {}
  }
);

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setShowAddForm: (state, action) => {
      const { visibility, planId } = action.payload;
      state.showAddForm = visibility;
      state.planId = planId || null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export const { setShowAddForm } = exercisesSlice.actions;

export default exercisesSlice.reducer;
