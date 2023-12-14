import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";
import { deletePostThunk } from "../../App/Features/Posts/asyncThunks";
import { toast } from "react-toastify";
import UserProfileLink from "../UserProfileLink";
import { useState } from "react";
import EditPost from "./EditPost";

const AuthorDropdown = ({ control, post }) => {
  const { userId, _id } = post;
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState(false);

  const handleDelete = () => {
    if (userId === authUser._id) {
      dispatch(deletePostThunk({ post }));
    } else {
      toast.error("Forbidden");
    }
  };

  return (
    <>
      <div className="absolute top-10 right-0 shadow-md w-32 bg-white-pure rounded-b-md transition-all duration-150 overflow-hidden z-10 block">
        <UserProfileLink userId={userId}>View Profile</UserProfileLink>
        <div className="p-1">
          {control && (
            <>
              <button
                className="text-sm text-gray-para cursor-pointer py-1 px-2 hover:text-green-500 transition-colors"
                onClick={() => setEditForm(true)}
              >
                <i className="fa-regular fa-pen-to-square pr-3"></i>
                Edit
              </button>
              <button
                className="text-sm text-gray-para py-1 px-2 hover:text-red-500 transition-colors"
                onClick={handleDelete}
              >
                <i className="fa-regular fa-trash-can pr-3"></i>
                Delete
              </button>
            </>
          )}
          <p className="text-sm text-gray-para cursor-pointer py-1 px-2 hover:text-blue-500 transition-colors">
            <i className="fa-regular fa-share-from-square pr-3"></i>
            Share
          </p>
        </div>
      </div>
      {editForm && (
        <EditPost form={editForm} setForm={setEditForm} post={post} />
      )}
    </>
  );
};

export default AuthorDropdown;
