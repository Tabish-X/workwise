import { useSelector } from "react-redux";
import { getAuthUser } from "../App/Features/LoginedUser/authSlice";
import { getUserById } from "../App/Features/Users/selectors";
import { Link } from "react-router-dom";

const UserProfileLink = ({ children, userId }) => {
  const authUser = useSelector(getAuthUser);
  const user = getUserById(userId);
  return (
    <Link
      to={`/profile/${
        userId === authUser._id ? "main" : "search/" + user.username
      }`}
      className="text-sm font-semibold text-center block cursor-pointer py-1 px-2 hover:text-theme-secondary transition-colors"
    >
      {children}
    </Link>
  );
};

export default UserProfileLink;
