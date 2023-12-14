import { asyncStatus } from "../../../contants";
import {
  getAuthUserThunk,
  signInUserThunk,
  signOutThunk,
  signupUserThunk,
} from "./UserThunks";

import { createUserProfileThunk } from "./profileThunk";
import { followUserThunk, unFollowUserThunk } from "../Users/asyncThunks";
import { editUserProfileThunk } from "../Profiles/asyncThunks";

export const authReducers = (builder) => {
  builder
    // FOR USER PROFILE
    .addCase(createUserProfileThunk.pending, (state, action) => {
      return { ...state, profileStatus: asyncStatus.loading };
    })
    .addCase(createUserProfileThunk.fulfilled, (state, action) => {
      const { result, error, profile } = action.payload;
      if (result === "success") {
        return {
          ...state,
          profile,
          user: { ...state.user, isProfile: true },
          profileStatus: asyncStatus.success,
        };
      }
      return { ...state, profileStatus: asyncStatus.error, error };
    })

    // FOR USER DATA
    .addCase(signInUserThunk.pending, (state, action) => {
      return {
        ...state,
        loginStatus: asyncStatus.loading,
        profileStatus: asyncStatus.loading,
      };
    }) // loading

    .addCase(signInUserThunk.fulfilled, (state, action) => {
      const { result, user, profile, error } = action.payload;
      switch (result) {
        case "NOT_VERIFIED":
          return {
            ...state,
            loginStatus: asyncStatus.success,
            profileStatus: asyncStatus.error,
            user,
          };
        case "USER_PROFILE":
          return {
            ...state,
            loginStatus: asyncStatus.success,
            user,
            profile,
            profileStatus: asyncStatus.success,
            error: null,
          };
        case "USER":
          return {
            ...state,
            loginStatus: asyncStatus.success,
            user,
            profileStatus: asyncStatus.error,
            error: null,
          };

        default:
          return {
            ...state,
            loginStatus: asyncStatus.error,
            profileStatus: asyncStatus.error,
            error,
          };
      }
    }) //  user signin

    .addCase(getAuthUserThunk.pending, (state, action) => {
      return {
        ...state,
        loginStatus: asyncStatus.loading,
        profileStatus: asyncStatus.loading,
      };
    }) // loading

    .addCase(getAuthUserThunk.fulfilled, (state, action) => {
      const { result, user, profile, error } = action.payload;
      switch (result) {
        case "NOT_VERIFIED":
          return {
            ...state,
            loginStatus: asyncStatus.idle,
            profileStatus: asyncStatus.idle,
          };
        case "USER_PROFILE":
          return {
            loginStatus: asyncStatus.success,
            user,
            profile,
            profileStatus: asyncStatus.success,
            error: null,
          };
        case "USER":
          return {
            ...state,
            loginStatus: asyncStatus.success,
            user,
            profileStatus: asyncStatus.error,
            error: null,
          };

        default:
          return {
            ...state,
            loginStatus: asyncStatus.error,
            profileStatus: asyncStatus.error,
            error,
          };
      }
    }) // getting user data

    .addCase(signOutThunk.fulfilled, (state, action) => {
      return {
        ...state,
        user: {},
        profile: {},
        loginStatus: asyncStatus.idle,
        profileStatus: asyncStatus.idle,
      };
    })
    .addCase(signupUserThunk.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loginStatus: asyncStatus.success,
      };
    })
    .addCase(followUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
    })
    .addCase(unFollowUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
    })
    .addCase(editUserProfileThunk.fulfilled, (state, action) => {
      state.profile = action.payload
    })

  // END FOR SURE
};
