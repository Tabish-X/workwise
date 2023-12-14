import { useSelector } from "react-redux";
import { postsAdapter } from "./postsSlice";

const {
  selectAll,
  selectById,
  selectIds: getPostsIds,
} = postsAdapter.getSelectors();

export const getAllPosts = () => useSelector((state) => selectAll(state.posts))
export const getPostsStatus = () => useSelector((state) => state.posts.status)
export const getPostById = (id) => useSelector((state) => selectById(state.posts, id))