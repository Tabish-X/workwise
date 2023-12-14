import { useSelector } from "react-redux";
import { getAuthProfile } from "../../App/Features/LoginedUser/authSlice";
import { useState } from "react";
import Dropdown from "./Dropdown";
import {Link} from "react-router-dom"

const AuthUser = () => {
  const authProfile = useSelector(getAuthProfile);
  const { profileImage, firstName, lastName } = authProfile;
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="relative h-full w-fit">
        <div className="flex items-center justify-between gap-2 text-white-lite p-2 px-3 cursor-pointer w-full h-full">
          <>
            <Link to="/profile/main" className="flex items-center justify-between gap-2">
            <img
              src={profileImage}
              alt={firstName}
              className="w-8 h-8 object-cover rounded-full block border"
            />
            <p>
              {firstName} {lastName}
            </p>
            </Link>
            <button
              onClick={() => setDropdown((v) => !v)}
             className="h-2 w-2 flex items-center justify-center"
            >
              <i className={`fa-solid fa-caret-down ${dropdown && "rotate-180"} rotate-0 transition-transform`}></i>
            </button>
          </>
        </div>

        {dropdown && <Dropdown />}
      </div>
    </>
  );
};

export default AuthUser;
