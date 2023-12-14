import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";
import { getUserById } from "../../App/Features/Users/selectors";
import {
  followUserThunk,
  unFollowUserThunk,
} from "../../App/Features/Users/asyncThunks";

const Followers = ({ userId }) => {
  const user = getUserById(userId);
  const authUser = useSelector(getAuthUser);
  const isFollowing = user?.followers.includes(authUser._id);

  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(followUserThunk({ followUserId: userId }));
  };

  const handleUnFollow = () => {
    dispatch(unFollowUserThunk({ unFollowUserId: userId }));
  };

  return (
    <>
      <div className="pt-24 pb-4 flex flex-col gap-4 mx-auto text-center items-center justify-center">
        {authUser._id !== userId && (
          <div className="space-x-4">
            {isFollowing ? (
              <button
                className="px-4 py-2 bg-red-400 text-white-pure rounded-sm"
                onClick={handleUnFollow}
                
              >
                - Unfollow
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-400 text-white-pure rounded-sm"
                onClick={handleFollow}
              >
                + Follow
              </button>
            )}
            <button className="px-4 py-2 bg-blue-400 text-white-pure rounded-sm">
              Hire
            </button>
          </div>
        )}

        <span className="inline-flex gap-4">
          <div>
            <p className="text-gray-para">Following</p>
            <strong>{user?.following.length}</strong>
          </div>
          <div>
            <p className="text-gray-para">Followers</p>
            <strong>{user?.followers.length}</strong>
          </div>
        </span>
      </div>
    </>
  );
};

export default Followers;
