import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const initialState = {
  data: [],
};

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    try {
      const { data: res } = await api.get(API_URLS.coupons.list);
      return res;
    } catch (ex) {}
  }
);

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoupons.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export const { setIsFormOpen } = couponsSlice.actions;

export default couponsSlice.reducer;
