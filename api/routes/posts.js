const router = require("express").Router();
const { verifyJwtToken } = require("../middlewares/verifyJwtToken");
const {
  CreatePost,
  GetPosts,
  EditPost,
  DeletePost,
  PostComment,
  LikePost,
  unLikePost,
  deleteComment,
  editComment,
} = require("../controllers/posts.control");

// @desc GET ALL POSTS
router.get("/", verifyJwtToken, GetPosts);

// @desc CREATE A POST
router.post("/", verifyJwtToken, CreatePost);

// @desc EDIT A POST
router.patch("/", verifyJwtToken, EditPost);

router.patch("/editcomment", verifyJwtToken, editComment)

// @desc POST A COMMENT
router.post("/addcomment", verifyJwtToken, PostComment);

// @desc LIKE A POST
router.post("/likepost", verifyJwtToken, LikePost)

// @desc UNLIKE A POST
router.post("/unlikepost", verifyJwtToken, unLikePost)

// @desc DELETE A POST
router.delete("/:postId", verifyJwtToken, DeletePost);

router.delete("/deleteComment/:postId/:commentId", verifyJwtToken, deleteComment)

module.exports = router;
