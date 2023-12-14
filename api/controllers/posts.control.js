const Users = require("../models/Users");
const Posts = require("../models/Posts");
const sendNotification = require("../utils/sendNotification");

// @desc GET ALL POSTS
// @method | GET |
// @path "/posts/"
const GetPosts = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({ message: "Unautherized user" });
  }

  try {
    const posts = await Posts.find();
    if (!posts) {
      return res.status(404).json({ message: "posts not found" });
    }

    return res.status(200).json({
      message: "Successfully retrieved all posts",
      ok: true,
      posts,
      length: posts.length === 0 ? 0 : undefined,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

// @desc CREATE A POST
// @method | POST |
// @path "/posts/"
const CreatePost = async (req, res) => {
  const { userId } = req;
  const { type, category, title, desc, price, skills, country, availability } =
    req.body;
  if (!category || !title || !desc || !price || !skills || !type || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (type === "job" && !availability) {
    return res.status(400).json({ message: "Availability is required" });
  }

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unautherized user" });
    }

    const newPost = {
      userId,
      type,
      category,
      title,
      desc,
      price,
      skills,
      country,
      availability: type === "job" && availability,
      createdAt: new Date(),
    };

    const post = await Posts.create(newPost);

    const notification = user.followers.map(async (id) => {
      return await sendNotification(
        id,
        userId,
        `recently created new ${post.type} post`
      );
    });

    const editUser = await Users.findByIdAndUpdate(
      userId,
      {
        $push: { posts: post._id },
      },
      { new: true }
    );
    if (!editUser) {
      return res.status(500).json({ message: "Somthing went wrong" });
    }

    return res
      .status(200)
      .json({ message: "Post has been created", ok: true, post });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

// @desc EDIT A POST
// @method | PATCH |
// @path "/posts/"
const EditPost = async (req, res) => {
  const { userId } = req;
  const { post } = req.body;
  if (!post) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const editPost = await Posts.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    if (!post) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ message: "Successfully updated", ok: true, post: editPost });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

// @desc DELETE A POST
// @method | DELETE |
// @path "/posts/"
const DeletePost = async (req, res) => {
  const { userId } = req;
  const { postId } = req.params;
  if (!postId) {
    return res.status(400).json({ message: "Post id is required" });
  }

  try {
    const post = await Posts.findByIdAndDelete(postId);
    if (!post) {
      return res.status(500).json({ message: "Post not found" });
    }
    const user = await Users.findByIdAndUpdate(userId, {
      $pull: { posts: post._id },
    });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted", ok: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

// @desc POST A COMMENT
// @method | POST |
// @path "/posts/addcomment"
const PostComment = async (req, res) => {
  const userId = req.userId;
  const { message, postId } = req.body;

  if (!message || !postId) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const post = await Posts.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            userId,
            message,
            time: Date.now(),
          },
        },
      },
      { new: true }
    );
    if (!post) {
      return res
        .status(500)
        .json({ message: "Something went wrong while commenting" });
    }

    const notification = await sendNotification(
      post.userId,
      userId,
      `Recently commented on your ${post.type} post.`,
      `/posts/search/${post._id}`
    );

    return res.status(200).json({
      message: "Successfully commented",
      ok: true,
      user: notification,
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

// @desc POST A COMMENT
// @method | POST |
// @path "/posts/addcomment"
const LikePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.body;
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updateUser = await Users.findByIdAndUpdate(
      userId,
      {
        $push: { likedPosts: postId },
      },
      { new: true }
    );
    const likePost = await Posts.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully liked post",
      ok: true,
      post: likePost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const unLikePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.body;
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updateUser = await Users.findByIdAndUpdate(
      userId,
      {
        $pull: { likedPosts: postId },
      },
      { new: true }
    );
    const likePost = await Posts.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully liked post",
      ok: true,
      post: likePost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const deleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  if (!commentId || !postId) {
    return res.status(400).json({ message: "Comment & post id is required" });
  }
  try {
    const post = await Posts.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted comment", ok: true, post });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const editComment = async (req, res) => {
  const { commentId, postId, message } = req.body;
  if (!commentId || !postId || !message) {
    return res.status(400).json({ message: "Comment & post id is required" });
  }
  try {
    const post = await Posts.findOneAndUpdate(
      { _id: postId, comments: { $elemMatch: { _id: commentId } } },
      { $set: { "comments.$.message": message } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted comment", ok: true, post });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

module.exports = {
  CreatePost,
  GetPosts,
  EditPost,
  DeletePost,
  PostComment,
  LikePost,
  unLikePost,
  deleteComment,
  editComment
};
