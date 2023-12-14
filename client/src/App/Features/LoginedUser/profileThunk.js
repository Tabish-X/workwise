import { createAsyncThunk } from "@reduxjs/toolkit";
import { profilApi } from "../../../utils/api";
import { toast } from "react-toastify";

export const createUserProfileThunk = createAsyncThunk(
  "auth/profile",
  async (data) => {
    try {
      const res = await profilApi.post("/create", { data });
      toast.success("Profile created");
      return { result: "success", profile: res.data.profile };
    } catch (error) {
      if (error.response) {
        return { result: "ERROR", error: error.response.data.message };
      }
      return { result: "ERROR", error: error.message };
    }
  }
);
