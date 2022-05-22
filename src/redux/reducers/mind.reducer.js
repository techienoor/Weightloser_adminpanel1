import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { set, findIndex } from "lodash";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const initialState = {
  data: [],
  plans: [],
  cbt: [],
  showAddForm: false,
  planId: null,
};

export const fetchMind = createAsyncThunk("mind/fetchMind", async () => {
  try {
    const { data: res } = await api.get(API_URLS.mind.list);
    return res.plans;
  } catch (ex) {}
});
export const fetchCBT = createAsyncThunk("mind/fetchCBT", async () => {
  try {
    const { data: res } = await api.get(API_URLS.mind.cbt.list);
    return res.videosData;
  } catch (ex) {}
});

export const mindSlice = createSlice({
  name: "mind",
  initialState,
  reducers: {
    setShowAddForm: (state, action) => {
      const { visibility, planId } = action.payload;
      state.showAddForm = visibility;
      state.planId = planId || null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMind.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(fetchCBT.fulfilled, (state, action) => {
      if (action.payload) {
        state.cbt = action.payload;
      }
    });
  },
});

export const { setShowAddForm } = mindSlice.actions;

export default mindSlice.reducer;
