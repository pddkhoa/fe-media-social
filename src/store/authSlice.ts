import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggin: false,
    isActive: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isLoggin = true;
    },
    registerPending: (state) => {
      state.isActive = true;
    },
    registerSuccess: (state) => {
      state.isActive = false;
    },
  },
});

export const { loginSuccess, registerPending, registerSuccess } =
  authSlice.actions;

export default authSlice.reducer;
