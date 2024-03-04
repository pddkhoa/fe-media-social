import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggin: false,
    isActive: false,
    isForgotPassword: false,
    email: "",
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
    forgotPasswordPending: (state, payload) => {
      state.isForgotPassword = true;
      state.isActive = true;
      state.email = payload.payload;
    },
    forgotPasswordSuccess: (state) => {
      state.isActive = false;
      state.isForgotPassword = false;
      state.email = "";
    },
  },
});

export const {
  loginSuccess,
  registerPending,
  registerSuccess,
  forgotPasswordPending,
  forgotPasswordSuccess,
} = authSlice.actions;

export default authSlice.reducer;
