import { UserToken } from "@/type/user";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggin: false,
    isActive: false,
    isForgotPassword: false,
    email: "",
    userToken: {} as UserToken,
  },
  reducers: {
    loginSuccess: (state, payload) => {
      state.isLoggin = true;
      state.userToken = payload.payload;
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
    uploadAvatarSuccess: (state, payload) => {
      state.userToken.user.avatar.url = payload.payload;
    },
    updateInfoSuccess: (state, payload) => {
      state.userToken.user = payload.payload;
    },
  },
});

export const {
  loginSuccess,
  registerPending,
  registerSuccess,
  forgotPasswordPending,
  forgotPasswordSuccess,
  uploadAvatarSuccess,
  updateInfoSuccess,
} = authSlice.actions;

export default authSlice.reducer;
