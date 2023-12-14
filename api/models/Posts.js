const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  availability: {
    type: String,
  },

  country: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      userId: { type: String },
      message: { type: String },
      date: { type: Date },
    },
  ],
});

const Posts = mongoose.model("POST", postSchema);
module.exports = Posts;
