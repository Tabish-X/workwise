import {
  followUserThunk,
  getAllUsersThunk,
  unFollowUserThunk,
} from "./asyncThunks";
import { asyncStatus } from "../../../contants";
import { usersAdapter } from "./usersSlice";

export const extraReducers = (builder) => {
  builder
    .addCase(getAllUsersThunk.pending, (state, action) => {
      state.status = asyncStatus.loading;
    })
    .addCase(getAllUsersThunk.fulfilled, (state, action) => {
      const { result, users, error } = action.payload;
      switch (result) {
        case "ERROR":
          state.error = error;
          state.status = asyncStatus.error;
          break;
        default:
          usersAdapter.setAll(state, users);
          state.error = error;
          state.status = asyncStatus.success;
          break;
      }
    })
    .addCase(followUserThunk.fulfilled, (state, action) => {
      usersAdapter.upsertMany(state, action.payload);
    })
    .addCase(unFollowUserThunk.fulfilled, (state, action) => {
      usersAdapter.upsertMany(state, action.payload);
    });
};
