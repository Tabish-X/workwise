import { useEffect, useRef, useState } from "react";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import { toast } from "react-toastify";
import { imageToBase64 } from "../../utils/imageToBase64";
import { editUserProfileThunk } from "../../App/Features/Profiles/asyncThunks";
import { useDispatch } from "react-redux";

const ProfileImage = ({ userId }) => {
  const dispatch = useDispatch()
  const profile = getProfileById(userId);
  const [profileImage, setProfileImage] = useState(profile?.profileImage);
  const profileImageRef = useRef();

  const handleProfileImage = async (e) => {
    try {
      const image = await imageToBase64(e.target.files[0]);
      setProfileImage(image);
      dispatch(editUserProfileThunk({ ...profile, profileImage: image }));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setProfileImage(profile?.profileImage);
  }, [profile]);
  return (
    <div
      id="profile-image-container"
      className="absolute w-40 h-40 bg-white-bg rounded-[100%] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white-pure overflow-hidden flex items-center justify-center select-none pfp"
    >
      <img
        src={profileImage}
        alt="user"
        className="w-full h-full object-cover"
      />

      <div
        id="profile-image-icon"
        className="w-full h-10 bg-[#0000007e] absolute bottom-0 cursor-pointer flex items-center justify-center transition-opacity duration-70 opacity-0"
        onClick={() => profileImageRef.current.click()}
      >
        <i className="fa-solid fa-camera text-gray-300 "></i>
        <input
          type="file"
          className="hidden"
          ref={profileImageRef}
          onChange={handleProfileImage}
        />
      </div>
    </div>
  );
};

export default ProfileImage;
