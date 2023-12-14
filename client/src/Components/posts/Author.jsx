import { useState } from "react";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import AuthorDropdown from "./AuthorDropdown";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";
import TimeAgo from "./TimeAgo";

const Author = ({ post }) => {
  const { userId, _id, createdAt } = post
  const profile = getProfileById(userId);
  const authUser = useSelector(getAuthUser);
  const { firstName, lastName, profession, location, profileImage } = profile;
  const [dropdown, setDropdown] = useState(null);

  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(null);
    } else {
      setDropdown(_id);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center justify-center">
          <div className="h-12 w-12 block rounded-full overflow-hidden">
            <img src={profileImage} alt={firstName} />
          </div>
          <div>
            <h4 className="font-semibold">
              {firstName} {lastName}{" "}
            </h4>
            <TimeAgo timeSpan={createdAt}/>
          </div>
        </div>

        <div className="relative">
          <button
            className="text-sm text-gray-shade2 hover:text-theme-secondary p-2 px-4"
            onClick={handleDropdown}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          {dropdown === _id && (
            <AuthorDropdown
              dropdown={dropdown}
              control={authUser._id === userId}
              post={post}
            />
          )}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-shade2 space-x-4">
        <span>
          <i className="fa-solid fa-cubes-stacked mr-1 text-blue-400"></i>
          {profession}
        </span>
        <span>
          <i className="fa-solid fa-location-arrow mr-1 text-green-400"></i>
          {location.country}
        </span>
      </div>
    </>
  );
};

export default Author;
