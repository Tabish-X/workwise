import { useEffect, useRef, useState } from "react";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import { useDispatch } from "react-redux";
import { imageToBase64 } from "../../utils/imageToBase64";
import { editUserProfileThunk } from "../../App/Features/Profiles/asyncThunks";
import { toast } from "react-toastify";

const CoverArt = ({ userId }) => {
  const profile = getProfileById(userId);
  const dispatch = useDispatch();
  const [coverImage, setCoverImage] = useState("");
  const coverImageRef = useRef();
  const handleCoverImage = async (e) => {
    try {
      const image = await imageToBase64(e.target.files[0]);
      setCoverImage(image);
      dispatch(editUserProfileThunk({ ...profile, coverImage: image }));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (profile) {
      setCoverImage(profile.coverImage);
    }
  }, [profile]);
  return (
    <>
      <div
        id="cover-image-container"
        className="w-full h-52 block bg-gray-800 relative md:h-64 lg:h-96"
      >
        {/* <span className="bg-[#0000007e]"> */}
        <i
          id="cover-image-icon"
          className="fa-solid fa-image bg-[#0000007e]  p-4 rounded-[100%] text-gray-300 cursor-pointer absolute bottom-4 right-4 transition-opacity duraiton-75 opacity-0"
          onClick={() => coverImageRef.current.click()}
        ></i>
        <input
          type="file"
          className="hidden"
          ref={coverImageRef}
          onChange={handleCoverImage}
        />

        <img src={coverImage} alt="" className="w-full h-full object-cover" />
      </div>
    </>
  );
};

export default CoverArt;
