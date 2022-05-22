import { createSlice } from "@reduxjs/toolkit";
const APP_USER = "WEIGH_T_CHOP__PER__USER";

const initialState = {
  data: localStorage.getItem(APP_USER)
    ? JSON.parse(localStorage.getItem(APP_USER))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        APP_USER,
        action.payload ? JSON.stringify(action.payload) : null
      );
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
