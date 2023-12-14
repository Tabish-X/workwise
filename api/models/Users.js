const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = require("../constant/constant");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  profileId: String,
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isProfile: {
    type: Boolean,
    required: true,
    default: false,
  },
  posts: Array,
  notifications: [
    {
      message: String,
      userId: String,
      time: Date,
      redirect: String,
      
    },
  ],
  followers: Array,
  following: Array,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(SALT);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

userSchema.methods.MatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Users = mongoose.model("User", userSchema);

module.exports = Users;
