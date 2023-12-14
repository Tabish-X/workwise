import { useDispatch, useSelector } from "react-redux";
import {
  likePostThunk,
  unLikePostThunk,
} from "../../App/Features/Posts/asyncThunks";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";

const Likes = ({ post }) => {
  const { likes, } = post;
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();

  // to check if the auth user has already liked post or not
  const postLikes = post.likes;
  const liked = postLikes.includes(authUser._id);

  const handleLike = () => {
    // if not already liked
    if (liked) {
      dispatch(unLikePostThunk({ postId: post._id }));
    } else {
      dispatch(likePostThunk({ postId: post._id }));
    }
  };

  return (
    <span
      className={`text-sm text-gray-shade2 cursor-pointer transition-colors ${
        liked ? "text-red-600" : "hover:text-red-300"
      }`}
      onClick={handleLike}
      title={liked? "unlike": "like"}
    >
      <i className="fa-solid fa-heart mr-2 "></i>
      Likes {likes.length}
    </span>
  );
};

export default Likes;
