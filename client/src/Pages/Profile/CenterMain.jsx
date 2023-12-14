import { useEffect, useState } from "react";
import InfoTab from "./InfoTab";
import FeedsTab from "./FeedsTab";
import ImagesTab from "./ImagesTab";
import { getProfileById } from "../../App/Features/Profiles/selectors";

const CenterMain = ({ userId }) => {
  const [control, setControl] = useState("feed");
  const profile = getProfileById(userId);
  const [profile1, setProfile1] = useState({} | profile);

  const { firstName, lastName, profession } = profile1;
  useEffect(() => {
    if (profile) {
      setProfile1(profile);
    }
  }, [profile]);

  return (
    <div className="w-full lg:w-2/3">
      {/* for control center */}
      <div className="p-10 w-full">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold capitalize">
            {firstName} {lastName}
          </h3>
          <p className="text-lg font-semibold text-gray-para capitalize">
            {profession}
          </p>
          <div className="flex gap-2 text-sm text-yellow-500">
            <i className="fa-solid fa-star cursor-pointer"></i>
            <i className="fa-solid fa-star cursor-pointer"></i>
            <i className="fa-solid fa-star cursor-pointer"></i>
            <i className="fa-solid fa-star-half-stroke cursor-pointer"></i>
            <i className="fa-regular fa-star cursor-pointer"></i>
          </div>
        </div>

        {/* //controls */}
        <div className="flex gap-10 mt-10 items-center justify-center">
          <span
            className={`text-gray-para text-center transition-colors cursor-pointer ${
              control === "feed" ? "control-active" : ""
            }`}
            onClick={() => setControl("feed")}
          >
            <i className="fa-solid fa-file-image block text-2xl"></i>
            Feed
          </span>
          <span
            className={`text-gray-para text-center transition-colors cursor-pointer ${
              control === "info" ? "control-active" : ""
            }`}
            onClick={() => setControl("info")}
          >
            <i className="fa-solid fa-circle-user block text-2xl"></i>
            Info
          </span>
          <span
            className={`text-gray-para text-center transition-colors cursor-pointer ${
              control === "images" ? "control-active" : ""
            }`}
            onClick={() => setControl("images")}
          >
            <i className="fa-solid fa-images block text-2xl"></i>
            Images
          </span>
        </div>
      </div>
      {/* END */}

      {control === "feed" && <FeedsTab userId={userId} />}
      {control === "info" && <InfoTab userId={userId} />}
      {control === "images" && <ImagesTab />}
    </div>
  );
};

export default CenterMain;
