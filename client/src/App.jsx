import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthUser,
  getLoginStatus,
  getProfileStatus,
} from "./App/Features/LoginedUser/authSlice";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { asyncStatus } from "./contants";
import { getUsersStatus } from "./App/Features/Users/selectors";
import { getProfilesStatus } from "./App/Features/Profiles/selectors";
import { getPostsStatus } from "./App/Features/Posts/selectors";

import { getPostsThunk } from "./App/Features/Posts/asyncThunks";
import { getAllUsersThunk } from "./App/Features/Users/asyncThunks";
import { getAllProfilesThunk } from "./App/Features/Profiles/asyncThunks";

const App = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatus);
  const profileStatus = useSelector(getProfileStatus);
  const usersStatus = getUsersStatus();
  const profilesStatus = getProfilesStatus();
  const postsStatus = getPostsStatus();
  const authUser = useSelector(getAuthUser);

  const { success, loading } = asyncStatus;

  let isLogin = loginStatus === success && authUser.isVerified;
  let isLoading = false;
  let isProfile = authUser.isProfile;

  if (
    profileStatus === loading ||
    loginStatus === loading ||
    usersStatus === loading ||
    profilesStatus === loading ||
    postsStatus === loading
  ) {
    isLoading = true;
  }

  useEffect(() => {
    if (loginStatus === asyncStatus.success) {
      dispatch(getPostsThunk());
      dispatch(getAllUsersThunk());
      dispatch(getAllProfilesThunk());
    }
  }, [loginStatus]);

  const routing = useRoutes(routes(isLogin, isProfile, isLoading));
  return <>{routing}</>;
};

export default App;
