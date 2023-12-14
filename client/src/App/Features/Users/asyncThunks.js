import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "../../../utils/api";
import { toast } from "react-toastify";

export const getAllUsersThunk = createAsyncThunk("users/getusers", async () => {
  try {
    const res = await usersApi.get("/");
    return { result: "SUCCESS", users: res.data.users };
  } catch (error) {
    if (error.response) {
      // toast.error(error.response.data.message);
      return { result: "ERROR", error: error.response.data.message };
    } else {
      console.error(error);
      // toast.error("something went wrong");
      return { result: "ERROR", error: "Something went wrong" };
    }
  }
});

export const followUserThunk = createAsyncThunk(
  "users/followuser",
  async ({ followUserId }) => {
    try {
      const res = await usersApi.post("/followuser", { followUserId });
      return { user: res.data.followedUser, authUser: res.data.user };
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const unFollowUserThunk = createAsyncThunk(
  "users/unfollowuser",
  async ({ unFollowUserId }) => {
    try {
      const res = await usersApi.post("/unfollowuser", { unFollowUserId });
      return { user: res.data.unFollowedUser, authUser: res.data.user };
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
