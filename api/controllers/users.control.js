const Users = require("../models/Users");
const Profiles = require("../models/Profiles");
const sendNotification = require("../utils/sendNotification");

const GetAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ ok: true, message: "Successfully retrieved", users });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const GetAllProfiles = async (req, res) => {
  try {
    const profiles = await Profiles.find();
    if (!profiles) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Successfully retrieved", profiles });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const FollowUser = async (req, res) => {
  const { followUserId } = req.body;
  const { userId } = req;
  console.log(followUserId);

  if (!followUserId) {
    return res.status(400).json({ message: "user id is required" });
  }

  if (followUserId === userId) {
    return res.status(400).json({ message: "User cannot follow himself" });
  }

  try {
    const followedUser = await Users.findByIdAndUpdate(
      followUserId,
      {
        $push: { followers: userId },
      },
      { new: true }
    );

    const follower = await Users.findByIdAndUpdate(
      userId,
      {
        $push: { following: followedUser._id },
      },
      { new: true }
    );

    if (!followedUser || !follower) {
      return res.status(404).json({ message: "user not found" });
    }

    const notification = await sendNotification(
      followedUser._id,
      userId,
      "has followed you recently",
      `/profile/search/${follower.username}`
    );

    return res.status(200).json({
      message: "Successfully followed user",
      ok: true,
      followedUser: notification,
      user: follower,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};

const UnFollowUser = async (req, res) => {
  const { unFollowUserId } = req.body;
  const { userId } = req;

  if (!unFollowUserId) {
    return res.status(400).json({ message: "user id is required" });
  }

  if (unFollowUserId === userId) {
    return res.status(400).json({ message: "User cannot un follow himself" });
  }

  try {
    const unFollowedUser = await Users.findByIdAndUpdate(
      unFollowUserId,
      {
        $pull: { followers: userId },
      },
      { new: true }
    );

    const follower = await Users.findByIdAndUpdate(
      userId,
      {
        $pull: { following: unFollowedUser._id },
      },
      { new: true }
    );

    if (!unFollowedUser || !follower) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({
      message: "Successfully unfollowed user",
      ok: true,
      unFollowedUser,
      user: follower,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error, ok: false });
  }
};
module.exports = { GetAllUsers, GetAllProfiles, FollowUser, UnFollowUser };
