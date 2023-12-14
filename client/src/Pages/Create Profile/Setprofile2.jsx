import { useRef } from "react";
import { imageToBase64 } from "../../utils/imageToBase64";
import { toast } from "react-toastify";

const Setprofile2 = ({ profile, setProfile, setProfileTab }) => {
  const coverImageRef = useRef(); // for cover image

  const profileImageRef = useRef(); // for profile image

  const handleCoverImage = async (e) => {
    
    const image = e.target.files[0];
    if (image) {
      let imageSize = image.size / 1024;
      if (imageSize > 1000) {
        return toast.error("Image must be less than 1mb");
      }
      {
        try {
          const newImage = await imageToBase64(image);
          setProfile({ ...profile, coverImage: newImage });
        } catch (error) {
          return toast.error(error.message);
        }
      }
    }
  };

  const handleProfileImage = async (e) => {
    const image = e.target.files[0];
    if (image) {
      let imageSize = image.size / 1024;
      if (imageSize > 1000) {
        return toast.error("Image must be less than 1mb");
      }
      {
        try {
          const newImage = await imageToBase64(image);
          setProfile({ ...profile, profileImage: newImage });
        } catch (error) {
          return toast.error(error.message);
        }
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!profile.coverImage || !profile.profileImage) {
      return toast.error("Profile & cover image is required");
    }
    setProfileTab("info");
  };

  return (
    <>
      <div className="">
        <p className="text-sm text-gray-para my-4">Add Profile & Cover image</p>
        <form
          className="w-full h-full space-y-6"
          onSubmit={handleNext}
          noValidate
        >
          {/* COVER IMAGE PART */}
          <div
            className="w-full h-40 block bg-white-bg relative cursor-pointer"
            onClick={() => coverImageRef.current.click()}
          >
            <input
              type="file"
              className="hidden"
              ref={coverImageRef}
              onChange={handleCoverImage}
            />

            {profile.coverImage ? (
              <img
                src={profile.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="font-semibold text-center pt-12 text-gray-300">
                Click to select an image
              </p>
            )}
          </div>

          {/* PROFILE IMAGE PART */}
          <div className="block w-full relative">
            <div
              className="absolute w-28 h-28 overflow-hidden bg-white-bg rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white-pure flex items-center justify-center select-none cursor-pointer"
              onClick={() => profileImageRef.current.click()}
              title="Click to select image"
            >
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="fa-solid fa-user text-5xl text-white-shade"></i>
              )}
              <input
                type="file"
                className="hidden"
                ref={profileImageRef}
                onChange={handleProfileImage}
              />
            </div>
          </div>

          <div className="pt-20">
            <button className="button">Next</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setprofile2;
