import { useSelector } from "react-redux";
import {
  getAuthUser,
} from "../App/Features/LoginedUser/authSlice";
import Footer from "./Footer";
import Followings from "./Followings";
import Profile from "./Profile";

const LeftContainer = () => {
  const authUser = useSelector(getAuthUser);

  return (
    <aside className="space-y-4 h-full lg:w-[25%]">
      {/* BASIC PROFILE DIVISION */}
      <Profile/>

      {/* FRIEND LIST DIVISION START */}
      <Followings userId={authUser._id}/>
      {/* FRIEND LIST DIVISION END */}

      {/* FOOTER START */}
      <Footer sm={true} white={true} />

      {/* FOOTER END */}
    </aside>
  );
};

export default LeftContainer;
