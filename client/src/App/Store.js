import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/LoginedUser/authSlice";
import postsReducer from "./Features/Posts/postsSlice";
import usersReducer from "./Features/Users/usersSlice";
import profilesReducer from "./Features/Profiles/profilesSlice";

const Store = configureStore({
  reducer: {
    authUser: authReducer,
    posts: postsReducer,
    users: usersReducer,
    profiles: profilesReducer,
  },
});

export default Store;
