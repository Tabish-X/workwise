import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Verification from "./Verification";
import LoginViaSocial from "./LoginViaSocial";

const SectionRight = ({ setCurrentTab, currentTab }) => {
  return (
    <section className="w-full p-8">
      {/* signin / signup button division */}
      <div className="w-full flex lg:justify-end">
        <div className="rounded-md overflow-hidden w-fit">
          <button
            className={`${
              currentTab === "signin" ? "signin_active" : ""
            } px-3 py-1 text-sm text-gray-shade1 bg-white-gray`}
            onClick={() => setCurrentTab("signin")}
          >
            Sign in
          </button>
          <button
            className={`${
              currentTab !== "signin" ? "signin_active" : ""
            } px-3 py-1 text-sm text-gray-shade1 bg-white-gray`}
            onClick={() => setCurrentTab("signup")}
          >
            sign up
          </button>
        </div>
      </div>

      {/* main signin/signup division */}
      <div className="px-4">
        <h3 className="my-8 w-fit text-gray-shade1 font-bold border-theme-secondary border-b-2 pb-1">
          Sign {currentTab == "signin" ? "In" : "Up"}
        </h3>

        {currentTab === "signin" && <Signin setCurrentTab={setCurrentTab} />}
        {currentTab === "signup" && <Signup setCurrentTab={setCurrentTab} />}
        {currentTab === "verification" && <Verification/>}
        
      </div>

      {/* login via social accounts division */}
      {currentTab === "signin" && <LoginViaSocial />}
    </section>
  );
};

export default SectionRight;
