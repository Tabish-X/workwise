import { useDispatch } from "react-redux";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import { deleteCommentThunk } from "../../App/Features/Posts/asyncThunks";

const Comment = ({ comment, postId, setState, setEdit }) => {
  const { userId, message, _id } = comment;
  const dispatch = useDispatch();
  const profile = getProfileById(userId);
  const { profileImage, firstName, lastName } = profile;

  const handleDelete = () => {
    dispatch(deleteCommentThunk({ postId, commentId: _id }));
  };

  const handleEdit = () => {
    
    setState(message)
    setEdit(_id)
  }

  return (
    <>
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={profileImage}
            className="w-full h-full object-cover"
            alt={firstName}
          />
        </div>
        <div className="bg-white-gray max-w-xs lg:max-w-lg p-2 inline-block rounded-sm">
          <h3 className="capitalize text-sm font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-para">{message}</p>
        </div>
        <div className="flex gap-2 text-xs">
          <i className="fa-solid fa-pencil text-green-500 cursor-pointer" onClick={handleEdit}></i>
          <i className="fa-solid fa-trash-can text-red-500 cursor-pointer" onClick={handleDelete}></i>
        </div>
      </div>
    </>
  );
};

export default Comment;
