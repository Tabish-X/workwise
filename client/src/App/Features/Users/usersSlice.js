import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { asyncStatus } from "../../../contants";
import { extraReducers } from "./reducers";

export const usersAdapter = createEntityAdapter({
  selectId: (state) => state._id,
});
const initialState = usersAdapter.getInitialState({
  status: asyncStatus.idle, // IDLE | LOADING | SUCCESS | ERROR
  error: null
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export default usersSlice.reducer;
