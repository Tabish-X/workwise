import { ToastContainer } from "react-toastify";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getLoginStatus,
  getProfileStatus,
} from "../App/Features/LoginedUser/authSlice";
import Loading from "../Components/Loading";

const Layout = () => {
  const loginStatus = useSelector(getLoginStatus);
  const profileStatus = useSelector(getProfileStatus);

  return (
    <>
      {loginStatus === "loading" || profileStatus === "loading" ? (
        <Loading/>
      ) : (
        <>
          <Header />
          <Outlet />
          <ToastContainer theme="dark" />
        </>
      )}
    </>
  );
};

export default Layout;
