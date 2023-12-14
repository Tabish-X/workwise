import { useSelector } from "react-redux";
import { usersAdapter } from "./usersSlice";

const {
  selectAll,
  selectById,
  selectIds: getPostsIds,
} = usersAdapter.getSelectors();

export const getAllUsers = () => useSelector((state) => selectAll(state.users));
export const getUserById = (id) =>
  useSelector((state) => selectById(state.users, id));

export const getUsersStatus = () => useSelector((state) => state.users.status);
