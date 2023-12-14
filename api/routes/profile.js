const router = require("express").Router();
const { verifyJwtToken } = require("../middlewares/verifyJwtToken");

const {
  GetUserProfile,
  CreateUserProfile,
  EditUserProfile,
} = require("../controllers/profile.control");
// const verifyJwtToken = require()

// #des GET USERS PROFILE DATA
router.get("/get", verifyJwtToken, GetUserProfile);

// #des CREATE USER PROFILE
router.post("/create", verifyJwtToken, CreateUserProfile);

// #des EDIT USER PROFILE DATA
router.patch("/edit", verifyJwtToken, EditUserProfile);

module.exports = router;
