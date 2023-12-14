const Users = require("../models/Users");
const Profiles = require("../models/Profiles");
const SendVerificationMail = require("../utils/sendVerificationMail");
const generateCode = require("../utils/generateCode");
const jwt = require("jsonwebtoken");
const { OTP_SECRET, ACCESS_TOKEN_SECRET } = require("../constant/constant");

// #path /auth/signup
// #method POST
// #des SIGN UP USER VIA EMAIL ADDRESS ROUTE
const SignUpUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Fields cannot be empty" });
  }

  try {
    // first check if username exist
    const checkUsername = await Users.findOne({ username });
    if (checkUsername) {
      return res
        .status(409)
        .json({ message: "Entered usrename is already registered" });
    }

    // sencond check if email exist
    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      return res
        .status(409)
        .json({ message: "Entered email is already registered" });
    }

    const user = await Users.create({
      email,
      username,
      password,
    });
    delete user.password;

    return res.status(201).json({
      ok: true,
      message: `new user: ${user.username} has been signed up`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// #path /auth/sendmail
// #method POST
// #des TO VERFIFY USER'S EMAIL ADDRESS ROUTE
const SendMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const verificationCode = generateCode();
  SendVerificationMail({ to: email, verificationCode: verificationCode });

  const verificationToken = jwt.sign(
    { verificationCode: verificationCode },
    OTP_SECRET,
    {
      expiresIn: "10min",
    }
  );

  res.cookie("verificationCode", verificationToken, {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    sameSite: true,
  });

  return res.status(200).json({ message: "Email has been sent successfully" });
};

// #path /auth/email/verifyemail
// #method POST
// #des TO VERFIFY USER'S EMAIL ADDRESS ROUTE
const verifyEmail = async (req, res) => {
  let token = req.cookies.verificationCode;
  const { verificationCode, email } = req.body;
  if (!verificationCode && !email) {
    return res
      .status(400)
      .json({ message: "Verification code & email is required" });
  }

  if (!token) {
    return res
      .status(404)
      .json({ message: "invalid varificaiton code or expired 1" });
  }

  // token = token.split("=")[1];

  const verifiedData = jwt.verify(token, OTP_SECRET, (err, data) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "invalid varificaiton code or expired", err: err });
    }
    return data.verificationCode;
  });

  try {
    if (verifiedData !== verificationCode) {
      return res.status(400).json({ message: "Invalid Verification code" });
    }

    const user = await Users.findOneAndUpdate({ email }, { isVerified: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.clearCookie("verificationCode");
    return res.status(200).json({ message: "User has been verified" });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// #path /auth/email/signin
// #method POST
// #des SIGN IN USER VIA EMAIL ADDRESS ROUTE
const SignInUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password is required" });
  }

  try {
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "invalid credintials" });
    }

    const checkPassword = await user.MatchPassword(password);
    if (!checkPassword) {
      return res.status(404).json({ message: "invalid credintials" });
    }

    const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET);

    res.cookie("jwtToken", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });

    const userData = await Users.findOne({ email }).select("-__v");
    if (userData.isProfile) {
      const profile = await Profiles.findById(userData.profileId);
      return res.status(200).json({
        message: "user signind in",
        ok: true,
        user: userData,
        profile: profile,
        both: true,
      });
    }

    return res
      .status(200)
      .json({ message: "user has been signed in", ok: true, user: userData });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// #path /auth/email/signout
// #method POST
// #des SIGN OUT USER VIA EMAIL ADDRESS ROUTE
const SignOutUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await Users.findById(userId);
    res.clearCookie("jwtToken");
    return res
      .status(200)
      .json({ message: `${user.username} has been signed out` });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// #path /auth/email/edituser
// #method POST
// #des CHANGE USER EMAIL ADDRESS DURING SIGNUP
const EditEmail = async (req, res, next) => {
  const { search, email } = req.body;
  if (!search || !email) {
    return res.status(400).json({ message: "email is required" });
  }
  try {
    const user = await Users.findOneAndUpdate({ email: search }, { email });
    if (!user) {
      return res.status(404).json({ message: "email is not registered yet" });
    }
    return res.status(200).json({ message: "email has been changed" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const getUserData = async (req, res) => {
  const { userId } = req;
  try {
    const user = await Users.findById(userId);
    const profile = await Profiles.findById(user.profileId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (profile) {
      return res.status(200).json({
        message: "successfully collected data",
        ok: true,
        profile,
        user,
        both: true,
      });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Successfully retrieved user data.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, ok: false, error: error.stack });
  }
};

module.exports = {
  SignInUser,
  SignUpUser,
  SignOutUser,
  verifyEmail,
  SendMail,
  EditEmail,
  getUserData,
};
