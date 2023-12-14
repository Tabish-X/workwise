import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthProfile } from "../../App/Features/LoginedUser/authSlice";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { editCommentThunk, postCommentThunk } from "../../App/Features/Posts/asyncThunks";

const Comments = ({ enable, post }) => {
  const { userId, _id, comments } = post;
  const authProfile = useSelector(getAuthProfile);
  const profile = getProfileById(userId);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = (e) => {
    if (!comment) {
      toast.error("Comment cannot be empty");
    } else {
      const data = {
        message: comment,
        postId: _id,
      };
      dispatch(postCommentThunk(data));
      setComment("");
      
    }
  };

  const handleEditComment = () => {
    dispatch(editCommentThunk({postId: _id, commentId: editComment, message: comment}))
    setComment("")
    setEditComment("")
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(editComment){
      handleEditComment()
    } else{
      handleCommentSubmit()
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 h-full w-full bg-[#00000034] z-10 flex items-center justify-center">
        <div id="wrapper" className="container">
          <div className="w-full bg-white-pure block rounded-sm overflow-hidden">
            <h3 className="font-semibold text-sm text-white-pure bg-theme-primary p-4">
              Comments of {profile.firstName}'s Post
            </h3>

            <div className="p-4 h-[400px] overflow-y-auto">
              <p
                className="text-right text-sm font-semibold text-theme-secondary cursor-pointer"
                onClick={() => enable(false)}
              >
                View Post
              </p>

              <div className="w-full space-y-4 mt-4 ">
                {/* comments */}
                {!comments.length ? (
                  <div className="flex gap-6 flex-col items-center justify-center w-full h-full">
                    <i className="fa-solid fa-message text-6xl text-white-gray"></i>
                    <p className="text-lg font-semibold text-white-gray">
                      No Comments
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <Comment
                      postId={_id}
                      comment={comment}
                      key={comment._id}
                      setState={setComment}
                      setEdit={setEditComment}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="p-4 border-t flex gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={authProfile.profileImage}
                  alt={authProfile.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
              <form
                className="rounded-full w-full h-8 flex items-center justify-start bg-white-gray"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Write a comment"
                  className="w-full outline-none border-none px-4 text-sm text-gray-para"
                  autoFocus
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="px-4 text-gray-para">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("popup-container")
  );
};

export default Comments;
