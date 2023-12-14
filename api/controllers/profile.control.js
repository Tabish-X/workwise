const Profiles = require("../models/Profiles");
const Users = require("../models/Users");

// #path /profile/get
// #method get
// #des GET USER PROFILE
const GetUserProfile = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.status(400).json({ message: "UserId not found" });
  }

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const profile = await Profiles.findById(user.profileId);

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res.status(200).json({
      ok: true,
      message: "Successfully retrieved user profile",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      error,
    });
  }
};

// #path /profile/create
// #method POST
// #des CREATE USER PROFILE
const CreateUserProfile = async (req, res) => {
  const { userId } = req;
  const { data } = req.body;
  const {
    firstName,
    lastName,
    birthday,
    profileImage,
    coverImage,
    profession,
    location,
  } = data;

  if (userId.profileId) {
    return res.status(400).json({ message: "user already has a profile" });
  }

  if (
    !firstName ||
    !lastName ||
    !birthday ||
    !profileImage ||
    !coverImage ||
    !profession ||
    !location
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const profile = await Profiles.create({ ...data, userId });

    if (!profile) {
      return res
        .status(400)
        .json({ message: "Something went wrong while creating profile" });
    }

    const user = await Users.findByIdAndUpdate(userId, {
      isProfile: true,
      profileId: profile._id,
    });
    if (!user) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    return res.status(200).json({
      ok: true,
      message: "successfully created user profile",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      error,
    });
  }
};

// #path /profile/edit
// #method POST
// #des EDIT USER PROFILE
const EditUserProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    profession,
    profileImage,
    coverImage,
    overview,
    location,
    _id,
    experience,
    education,
    skills,
    socialLinks,
  } = req.body;
  const { userId } = req;

  if (
    !firstName ||
    !lastName ||
    !profession ||
    !profileImage ||
    !coverImage ||
    !overview ||
    !location ||
    !_id
  ) {
    return res.status(400).json({ message: "All profile fields are required" });
  }

  try {
    const profile = await Profiles.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res
      .status(200)
      .json({
        message: "Successfully editted user profile",
        ok: true,
        profile,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, ok: false, error: error.stack });
  }
};

const ChangeCoverImage = async (req, res) => {
  const { coverImage, _id } = req.body;
  if (!coverImage || !_id) {
    return res.status(400).json({ message: "Cover image is required" });
  }

  try {
    const profile = await Profiles.findByIdAndUpdate(
      _id,
      { coverImage },
      { new: true }
    );
    if(!profile){
      return res.status(404).json({message: "Profile not found"})
    }
    return res.status(200).json({message: "successfully changed cover Image", ok: true, profile})
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      error,
    });
  }
};

module.exports = { GetUserProfile, CreateUserProfile, EditUserProfile };
