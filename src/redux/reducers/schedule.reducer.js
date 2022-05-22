import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showForm: false,
  module: null,
  userId: null,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      const { visibility, module, userId } = action.payload;
      state.showForm = visibility;
      state.module = module || null;
      state.userId = userId || null;
    },
  },
});

export const { setShowForm } = scheduleSlice.actions;

export default scheduleSlice.reducer;
