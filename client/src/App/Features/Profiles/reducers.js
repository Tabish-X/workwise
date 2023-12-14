import { editUserProfileThunk, getAllProfilesThunk } from "./asyncThunks";
import { asyncStatus } from "../../../contants";
import { profilesAdapter } from "./profilesSlice";

export const extraReducers = (builder) => {
  builder
    .addCase(getAllProfilesThunk.pending, (state, action) => {
      state.status = asyncStatus.loading;
    })
    .addCase(getAllProfilesThunk.fulfilled, (state, action) => {
      const { result, profiles, error } = action.payload;
      switch (result) {
        case "ERROR":
          state.error = error;
          state.status = asyncStatus.error;
          break;
        default:
          profilesAdapter.setAll(state, profiles);
          state.error = error;
          state.status = asyncStatus.success;
          break;
      }
    })
    .addCase(editUserProfileThunk.fulfilled, (state, action) => {
      profilesAdapter.upsertOne(state, action.payload)
    })
};
