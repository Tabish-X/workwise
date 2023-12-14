import { asyncStatus } from "../../../contants";
import {
  getPostsThunk,
  createPostThunk,
  postCommentThunk,
  likePostThunk,
  unLikePostThunk,
  deletePostThunk,
  editPostThunk,
  editCommentThunk,
  deleteCommentThunk,
} from "./asyncThunks";
import { postsAdapter } from "./postsSlice";

export const extraReducers = (builder) => {
  builder
    .addCase(getPostsThunk.pending, (state, action) => {
      state.status = asyncStatus.loading;
    })
    .addCase(getPostsThunk.fulfilled, (state, action) => {
      const { result, posts } = action.payload;
      state.status = result;
      if (result === asyncStatus.success) {
        postsAdapter.setAll(state, posts);
      }
    })
    .addCase(createPostThunk.fulfilled, (state, action) => {
      const { result, post, error } = action.payload;
      switch (result) {
        case "ERROR":
          state.error = error;
          state.status = asyncStatus.error;
          break;
        default:
          postsAdapter.addOne(state, post);
          state.error = undefined;
          state.status = asyncStatus.success;
          break;
      }
    })
    .addCase(deletePostThunk.fulfilled, (state, action) => {
      const { postId, result } = action.payload;
      if (result === "SUCCESS") {
        postsAdapter.removeOne(state, postId);
      }
    })
    .addCase(editPostThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      const { result, post } = action.payload;
      if (result === asyncStatus.success) {
        postsAdapter.upsertOne(state, post);
      }
    })

    .addCase(postCommentThunk.fulfilled, (state, action) => {
      const { result, post } = action.payload;
      if (result === "ERROR") {
        return state;
      }
      postsAdapter.upsertOne(state, action.payload.post);
    })
    .addCase(likePostThunk.fulfilled, (state, action) => {
      const { result, post } = action.payload;
      if (result === "SUCCESS") {
        postsAdapter.upsertOne(state, post);
      }
    })
    .addCase(unLikePostThunk.fulfilled, (state, action) => {
      const { result, post } = action.payload;
      if (result === "SUCCESS") {
        postsAdapter.upsertOne(state, post);
      }
    })
    .addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { result, post } = action.payload;
      if (result === asyncStatus.success) {
        postsAdapter.upsertOne(state, post);
      }
    })
    .addCase(editCommentThunk.fulfilled, (state, action) => {
      const { result, post } = action.payload;
      if (result === asyncStatus.success) {
        postsAdapter.upsertOne(state, post);
      }
    })
};
