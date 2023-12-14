const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  profession: String,
  birthday: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: [true, "profile image is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  overview: {
    type: String,
    required: true,
  },
  education: {
    title: String,
    para: String,
    time: String,
  },
  experience: {
    title: String,
    para: String,
  },
  location: {
    city: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  skills: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const UserProfile = mongoose.model("Profile", profileSchema);
module.exports = UserProfile;
