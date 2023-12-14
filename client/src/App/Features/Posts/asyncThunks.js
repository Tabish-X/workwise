import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { postApi } from "../../../utils/api";
import { asyncStatus } from "../../../contants";

export const getPostsThunk = createAsyncThunk("posts/getposts", async () => {
  try {
    const res = await postApi.get("/");
    const { posts } = res.data;

    return { result: asyncStatus.success, posts };
  } catch (error) {
    console.log(error);
    return { result: asyncStatus.error };
  }
});

export const createPostThunk = createAsyncThunk(
  "posts/createpost",
  async (post) => {
    try {
      const res = await postApi.post("/", post);
      toast.success("Posted");
      return { result: asyncStatus.success, post: res.data.post };
    } catch (error) {
      console.log(error);
      return { result: asyncStatus.error };
    }
  }
);

export const editPostThunk = createAsyncThunk(
  "post/editpost",
  async ({ post }) => {
    try {
      const res = await postApi.patch("/", { post });
      return { result: asyncStatus.success, post: res.data.post };
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error(error);
        return { result: asyncStatus.error, error: error.message };
      }
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  "/post/deletepost",
  async ({ post }) => {
    try {
      const res = await postApi.delete(`/${post._id}`);
      const { user } = res.data;
      return { result: asyncStatus.success, user, postId: post._id };
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return {
          result: asyncStatus.error,
          error: error.response.data.message,
        };
      } else {
        console.error(error);
        return { result: asyncStatus.error, error: "Something went wrong" };
      }
    }
  }
);

export const postCommentThunk = createAsyncThunk(
  "posts/postcomment",
  async ({ message, postId }) => {
    try {
      const res = await postApi.post("/addcomment", { message, postId });
      return { post: res.data.post };
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
      return { result: asyncStatus.error, error: "Something went wrong" };
    }
  }
);

export const likePostThunk = createAsyncThunk(
  "posts/likepost",
  async ({ postId }) => {
    try {
      const res = await postApi.post("/likepost", { postId });
      const { post } = res.data;
      return { result: asyncStatus.success, post };
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
      return { result: asyncStatus.error, error: "Something went wrong" };
    }
  }
);

export const unLikePostThunk = createAsyncThunk(
  "posts/unlikepost",
  async ({ postId }) => {
    try {
      const res = await postApi.post("/unlikepost", { postId });
      const { post } = res.data;
      return { result: asyncStatus.success, post };
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
      return { result: asyncStatus.error, error: "Something went wrong" };
    }
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "post/deletecomment",
  async ({ postId, commentId }) => {
    try {
      const res = await postApi.delete(`/deletecomment/${postId}/${commentId}`);
      return { result: asyncStatus.success, post: res.data.post };
    } catch (error) {
      console.log(error);
      return { result: asyncStatus.error };
    }
  }
);

export const editCommentThunk = createAsyncThunk(
  "post/editcomment",
  async ({ postId, commentId, message }) => {
    try {
      const res = await postApi.patch(`/editcomment`, {postId, commentId, message});
      return { result: asyncStatus.success, post: res.data.post };
    } catch (error) {
      console.log(error);
      return { result: asyncStatus.error };
    }
  }
);