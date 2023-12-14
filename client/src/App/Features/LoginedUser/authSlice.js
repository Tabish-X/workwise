import { createSlice } from "@reduxjs/toolkit";
import { authReducers } from "./reducers";
import { asyncStatus } from "../../../contants";

const initialState = {
  user: {},
  profile: {},
  loginStatus: asyncStatus.idle, // default | loading | failed | success
  profileStatus: asyncStatus.idle, // default | loading | failed | success
  error: "",
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: authReducers
});

// ALL SELECTORS FOR AUTH
export const getAuthProfile = (state) => state.authUser.profile;
export const getAuthUser = (state) => state.authUser.user;
export const getLoginStatus = (state) => state.authUser.loginStatus;
export const getProfileStatus = (state) => state.authUser.profileStatus;

// ALL REDUCERS IF ANY
export const {} = authSlice.actions;

export default authSlice.reducer;
