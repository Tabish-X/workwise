const router = require("express").Router();
const {
  SignInUser,
  SignUpUser,
  SignOutUser,
  verifyEmail,
  SendMail,
  EditEmail,
  getUserData
} = require("../controllers/auth.control");

const {verifyJwtToken} = require("../middlewares/verifyJwtToken");

// #des SIGN UP USER VIA EMAIL ADDRESS ROUTE
router.post("/signup", SignUpUser);

// #des TO VERIFY USER'S EMAIL ADDRESS ROUTE
router.post("/verifyemail", verifyEmail);

// #des TO SEND VERIFICATION CODE
router.post("/sendmail", SendMail)

router.patch("/editemail", EditEmail)

// #des SIGN IN USER VIA EMAIL ADDRESS ROUTE
router.post("/signin", SignInUser);

// #des SIGN OUT USER VIA EMAIL ADDRESS ROUTE
router.get("/signout", verifyJwtToken, SignOutUser);

router.get("/getauthdata", verifyJwtToken, getUserData);

// router.get("/ge")


module.exports = router;
