import { useEffect, useState } from "react";
import CenterMain from "./CenterMain";
import CoverArt from "./CoverArt";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
import { useSelector } from "react-redux";
import {
  getAuthUser,
} from "../../App/Features/LoginedUser/authSlice";
import Footer from "../../Components/Footer";
import { useLocation, useParams } from "react-router-dom";
import { getAllUsers } from "../../App/Features/Users/selectors";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { username } = useParams();
  const user = getAllUsers().filter((value) => {
    if (username === value.username) {
      return value._id;
    }
  });
  const authUser = useSelector(getAuthUser);
  const location = useLocation();
  const [userId, setUserId] = useState(authUser._id);
  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    if (location.pathname.includes("search")) {
      setUserId(user[0]._id)
    } else{
      setUserId(authUser._id)
    }
  }, [location]);

  return (
    <>
      <main className="relative mb-12" id="profile">
        {/* TOP SECTION FOR BACKGROUND COVER ART */}
        <CoverArt userId={userId}/>

        {/* CONTAINER TO CONTROL WIDTH FOR DIFF DEVICES */}
        <div className="container lg:flex">
          {/* LEFT ASIDE SECTION FOR USER BASIC INFO  */}
          <LeftAside
            userId={userId}
          />

          {/* MAIN CENTERED SECTION FOR ALL MAIN CONTENT */}
          <CenterMain userId={userId} />

          {/*  RIGHT ASIDE SECTION FOR IMAGES */}
          <RightAside setEditProfile={setEditProfile} userId={userId}/>
        </div>
      </main>
      <Footer white={true} />
      {
        editProfile && <EditProfile setForm={setEditProfile} userId={userId}/>
      }
    </>
  );
};

export default Profile;
