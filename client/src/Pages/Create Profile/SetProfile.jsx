import { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.png";
import MainImage from "../../Assets/login-main-img.png";
import Setprofile1 from "./Setprofile1";
import Setprofile2 from "./Setprofile2";
import Info from "./Info";
import SocialLinks from "./SocialLinks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserProfileThunk } from "../../App/Features/LoginedUser/profileThunk";

const SetProfile = () => {
  const initialProfileData = {
    firstName: undefined,
    lastName: undefined,
    profession: undefined,
    birthday: undefined,
    coverImage: undefined,
    profileImage: undefined,
    overview: undefined,
    experienceTitle: undefined,
    experiencePara: undefined,
    educationTitle: undefined,
    educationFrom: undefined,
    educationTo: undefined,
    educationPara: undefined,
    country: undefined,
    city: undefined,
    skills: undefined,
    facebook: undefined,
    twitter: undefined,
    youtube: undefined,
    github: undefined,
    website: undefined,
  };
  const [profile, setProfile] = useState(initialProfileData);
  const [profileTab, setProfileTab] = useState("name"); //name, images, info
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const HandleProfileSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      profession,
      birthday,
      coverImage,
      profileImage,
      overview,
      experienceTitle,
      experiencePara,
      educationTitle,
      educationFrom,
      educationTo,
      educationPara,
      country,
      city,
      skills,
    } = profile;

    let skillsArray;
    if (skills) {
      skillsArray = skills.trim();
      skillsArray = skills.split(" ");
    }
    const newProfile = {
      firstName,
      lastName,
      profession,
      birthday,
      coverImage,
      profileImage,
      overview,
      experience: {
        title: experienceTitle,
        para: experiencePara,
      },
      education: {
        title: educationTitle,
        time: educationFrom ? `${educationFrom} - ${educationTo}` : undefined,
        para: educationPara,
      },
      location: {
        city,
        country,
      },
      skills: skillsArray,
    };

    dispatch(createUserProfileThunk(newProfile));
  };

  return (
    <>
      <main className="min-h-[50rem] lg:min-h-[40rem] w-full bg-theme-primary flex flex-col items-center justify-center">
        {/* CONATINER WRAPPER TO CONTROL WIDTH */}
        <div className="container">
          <div className="flex flex-col lg:flex-row bg-white-pure rounded-md w-full h-full shadow-md">
            {/* // top section and left section  */}
            <section className="p-8 w-full border-b-[1px] lg:border-r-[1px] lg:border-b-0 flex flex-col items-center justify-center gap-10 select-none">
              <article className="min-h-36 max-w-96 space-y-8 lg:p-8">
                {/* logo division */}
                <img src={Logo} alt="brand logo" className="h-11 w-13" />

                {/* description division */}
                <p className="text-gray-para text-sm leading-6 w-full">
                  Workwise, is a global freelancing platform and social
                  networking where businesses and independent professionals
                  connect and collaborate remotely
                </p>
              </article>
              {/* signin image division for large divices */}
              <div className="h-44 w-full hidden lg:block">
                <img
                  src={MainImage}
                  alt="workwise"
                  className="h-full w-auto object-cover"
                />
              </div>
            </section>

            {/* MAIN SECTION FOR PROFILE TABS */}
            <section className="w-full h-fit my-auto flex justify-center flex-col gap-4 p-8">
              <h2 className="text-lg font-semibold ">
                Lets set up your profile
              </h2>
              {profileTab === "name" ? (
                <Setprofile1
                  profile={profile}
                  setProfile={setProfile}
                  setProfileTab={setProfileTab}
                />
              ) : profileTab === "images" ? (
                <Setprofile2
                  profile={profile}
                  setProfile={setProfile}
                  setProfileTab={setProfileTab}
                />
              ) : profileTab === "info" ? (
                <Info
                  profile={profile}
                  setProfile={setProfile}
                  setProfileTab={setProfileTab}
                  handleSubmit={HandleProfileSubmit}
                />
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default SetProfile;
