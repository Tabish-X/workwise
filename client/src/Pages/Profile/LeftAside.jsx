import { getProfileById } from "../../App/Features/Profiles/selectors";
import Followers from "./Followers";
import Followings from "../../Components/Followings";
import ProfileImage from "./ProfileImage";

const LeftAside = ({ userId }) => {
  const profile = getProfileById(userId);
  
  return (
    <aside className="w-full lg:w-1/3">
      {/* // user profile friends and followers section/ */}
      <div>
        <div className="bg-white-pure block w-full hfull relative border-b">
          <ProfileImage userId={userId} />
          <Followers userId={userId} />
        </div>
      </div>
      {/*END*/}
      {/* // for user friends list */}
      <Followings userId={userId} />
    </aside>
  );
};

export default LeftAside;
