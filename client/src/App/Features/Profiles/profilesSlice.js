import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {asyncStatus} from "../../../contants"
import { extraReducers } from "./reducers";

export const profilesAdapter = createEntityAdapter({
    selectId: (state) => state.userId
})

const initialState = profilesAdapter.getInitialState({
    status: asyncStatus.idle,
    error: null
})

const profilesSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {},
    extraReducers: extraReducers
})

export default profilesSlice.reducer