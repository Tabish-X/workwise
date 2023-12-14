import { Link } from "react-router-dom";
import LogoIcon from "../Assets/LogoIcon.png";
import { useState } from "react";
import data from "./data";
import AuthUser from "./header/AuthUser";
import Notifications from "./Notifications";

const Header = () => {
  const [navbar, setnNavbar] = useState(false);
  const [notification, setNotification] = useState(false);

  return (
    <header className="min-h-14 w-full bg-theme-primary flex flex-col  justify-between px-4 shadow-md md:flex-row md:px-12 lg:h-14 lg:px-14">
      {/* // logo and search bar division */}
      <div className="flex flex-col items-center gap-4 w-full md:flex-row lg:w-[45%]">
        <Link to={"/"}>
          <img src={LogoIcon} alt="logo" className="h-12 w-12" />
        </Link>

        <div className="bg-white-lite rounded-sm flex items-center h-9 w-full overflow-hidden md:w-64">
          <input
            type="text"
            placeholder="Search"
            className="text-xs p-1 px-2 outline-none border-none bg-transparent text-gray-para w-full "
          />
          <i className="fa-solid fa-magnifying-glass h-full pt-[10px] px-3 text-theme-primary bg-white-gray cursor-pointer"></i>
        </div>
      </div>

      {/* // navigation division  */}
      <div className="relative flex justify-between items-center mt-2 md:mt-0 md:w-full md:justify-end gap-4">
        <nav
          className={`fixed top-0 ${
            navbar ? "left-0" : "-left-[100%]"
          } h-screen w-56 bg-theme-secondary pl-6 text-white-lite text-sm py-8 transition-all duration-300 navbar z-50`}
        >
          <ul className="flex flex-col gap-6 ">
            {data.headerLinks.map((values, i) => {
              const { icon, link, text } = values;
              return (
                <li className="cursor-pointer" key={i}>
                  <Link to={link}>
                    <i className={icon}></i> {text}
                  </Link>
                </li>
              );
            })}
            <li className="cursor-pointer">
              <button onClick={() => setNotification((pre) => !pre)}>
                <i className="fa-solid mr-2 fa-bell"></i> Notifications
              </button>
            </li>
          </ul>
        </nav>

        {/* for user account */}
        <AuthUser />

        {notification && <Notifications />}

        <div className="text-right text-white-pure text-2xl select-none mr-2 min-[1200px]:hidden">
          {navbar ? (
            <i
              className="fa-solid fa-xmark cursor-pointer"
              onClick={() => setnNavbar(false)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-bars cursor-pointer"
              onClick={() => setnNavbar(true)}
            ></i>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
