import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./reducers";
import { asyncStatus } from "../../../contants";

export const postsAdapter = createEntityAdapter({
  selectId: (state) => state._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = postsAdapter.getInitialState({
  status: asyncStatus.idle, // IDLE | SUCCESS | ERROR | LOADING
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});


export default postsSlice.reducer