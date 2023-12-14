import { useSelector } from "react-redux";
import {
  getAuthProfile,
  getAuthUser,
} from "../App/Features/LoginedUser/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const authProfile = useSelector(getAuthProfile);
  const authUser = useSelector(getAuthUser);
  const { profileImage, firstName, lastName, profession } = authProfile;
  const { followers, following } = authUser;

  return (
    <div className="bg-white-pure h-full border">
      {/* top */}
      <div className="bg-theme-primary h-24 relative">
        <div className="w-28 h-28 block rounded-full overflow-hidden border-4 border-white-pure absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-0">
          <img
            src={profileImage}
            alt={""}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* name & profession  */}
      <div className="pt-24 pb-4 border-b-[1px] text-center">
        <h1 className="text-lg font-semibold  ">
          {firstName} {lastName}
        </h1>
        <h3 className="text-gray-para text-sm capitalize">{profession}</h3>
      </div>

      {/* for no. of following */}
      <div className="bg-white-pure border-b-[1px] p-4 text-center">
        <h3 className="text-lg text-gray-para">Following</h3>
        <p className="text-lg">{following.length}</p>
      </div>

      {/* for no. of followers */}
      <div className="bg-white-pure border-b-[1px] p-4 text-center">
        <h3 className="text-lg text-gray-para">Followers</h3>
        <p className="text-lg">{followers.length}</p>
      </div>

      {/* view profile button */}
      <div className="bg-white-pure border-b-[1px] p-4 text-center">
        <Link to="/profile/main">
          <button className="text-sm text-red-500 font-semibold">
            View profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
