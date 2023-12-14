import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import {
  getAuthUser,
  getLoginStatus,
} from "../../App/Features/LoginedUser/authSlice";
import SectionLeft from "./SectionLeft";
import SectionRight from "./SectionRight";
import { asyncStatus } from "../../contants";

const Login = () => {
  const [currentTab, setCurrentTab] = useState("signin"); // signup | signin | verification

  const loginStatus = useSelector(getLoginStatus);
  const authUser = useSelector(getAuthUser);

  useEffect(() => {
    if (loginStatus === asyncStatus.success && !authUser.isVerified) {
      setCurrentTab("verification");
    }
  }, [loginStatus]);

  return (
    <>
      <main className="absolute py-16 top-0 left-0 w-full min-h-screen z-10 bg-theme-primary flex flex-col items-center justify-center">
        {/* CONATINER WRAPPER TO CONTROL WIDTH */}
        <div className="container">
          <div className="flex flex-col lg:flex-row bg-white-pure rounded-md w-full h-full shadow-md">
            {/* top section and left section  */}
            <SectionLeft/>

            {/* signup / signin section */}
            <SectionRight setCurrentTab={setCurrentTab} currentTab={currentTab}/>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
