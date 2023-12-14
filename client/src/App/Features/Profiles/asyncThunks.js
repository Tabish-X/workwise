import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "../../../utils/api";
import { profilApi } from "../../../utils/api";

export const getAllProfilesThunk = createAsyncThunk(
  "users/getprofiles",
  async () => {
    try {
      const res = await usersApi.get("/profiles");
      return { result: "SUCCESS", profiles: res.data.profiles };
    } catch (error) {
      console.error(error);
      return { result: "ERROR" };
    }
  }
);

export const editUserProfileThunk = createAsyncThunk(
  "profiles/edit",
  async (data) => {
    try {
      const res = await profilApi.patch("/edit", data);
      console.log(res.data);
      return res.data.profile;
    } catch (error) {
      console.error(error);
      return { result: "ERROR" };
    }
  }
);
