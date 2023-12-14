const router = require("express").Router()
const { GetAllUsers, GetAllProfiles, FollowUser, UnFollowUser } = require("../controllers/users.control")
const {verifyJwtToken} = require("../middlewares/verifyJwtToken")

// @desc GET ALL USERS
router.get("/", verifyJwtToken, GetAllUsers)
router.get("/profiles", verifyJwtToken, GetAllProfiles)

// FOLLOW USER
router.post("/followuser", verifyJwtToken, FollowUser)

// UN FOLLOW USER
router.post("/unfollowuser", verifyJwtToken, UnFollowUser)


module.exports = router