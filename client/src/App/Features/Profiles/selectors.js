import { useSelector } from "react-redux";
import { profilesAdapter } from "./profilesSlice";

const {
  selectAll,
  selectById,
  selectIds: getPostsIds,
} = profilesAdapter.getSelectors();

export const getAllProfiles = () =>
  useSelector((state) => selectAll(state.profiles));
  
export const getProfileById = (userId) =>
  useSelector((state) => selectById(state.profiles, userId));

export const getProfilesStatus = () => useSelector((state) => state.profiles.status)
