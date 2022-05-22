import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const initialState = {
  data: [],
  plans: [],
  showAddForm: false,
  planId: null,
};

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    try {
      const { data: res } = await api.get(API_URLS.restaurants.list);
      return res.restaurants;
    } catch (ex) {}
  }
);

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setShowAddForm: (state, action) => {
      const { visibility, planId } = action.payload;
      state.showAddForm = visibility;
      state.planId = planId || null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export const { setShowAddForm } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
