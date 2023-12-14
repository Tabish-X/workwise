import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../../utils/api";
import { toast } from "react-toastify";

export const signInUserThunk = createAsyncThunk(
  "auth/signin",
  async (loginData) => {
    try {
      const res = await authApi.post("/signin", loginData);
      // result = NOT_VERIFIED | USER_PROFILE | USER
      const { user, profile } = res.data;
      if (!user.isVerified) {
        return { result: "NOT_VERIFIED", user: {...user, password: loginData.password} };
      } else if (res.data.both) {
        return { result: "USER_PROFILE", user, profile };
      } else {
        return { result: "USER", user };
      }
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message)
      return { result: "ERROR", error: error.response.data.message};

      }
      toast.error("Something went wrong");
      return { result: "ERROR", error: error.message };
    }
  }
);

export const getAuthUserThunk = createAsyncThunk("auth/getuser", async () => {
  try {
  const res = await authApi.get("/getauthdata");
    // result = NOT_VERIFIED | USER_PROFILE | USER
    const { user, profile } = res.data;
    if (!user.isVerified) {
      return { result: "NOT_VERIFIED" };
    } else if (res.data.both) {
      return { result: "USER_PROFILE", user, profile };
    } else {
      return { result: "USER", user };
    }
  } catch (error) {
    console.log(error);
    // toast.error("Something went wrong");
    return { result: "ERROR", error: error.message };
  }
});

export const signOutThunk = createAsyncThunk("auth/signout", async () => {
  try {
    const res = await authApi.get("/signout");
    toast.success("logout");
    return {};
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    return {};
  }
});

export const signupUserThunk = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await authApi.post("/signup", data);
    const {user} = res.data
    toast.success("Successfully signed up");
    return { ...user, password: data.password };

  } catch (error) {
    if(error.response){
      toast.error(error.response.data.message)
      return{result: "ERROR", error: error.response.data.message}
    }
    return {result: "ERROR", error: error.message}
  }
});
