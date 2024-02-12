import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthDialog(state, action) {
      state.authDialog = action.payload;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.user = null;
    },
  },
});

export const { toggleAuthDialog, loginSuccess, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
