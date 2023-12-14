import { useRef } from "react";
import { Images } from "./api";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";

const RightAside = ({ userId, setEditProfile, setEditSocial }) => {
  const imageRef = useRef();
  const authUser = useSelector(getAuthUser);

  return (
    <aside className="w-full my-10 lg:w-1/3">
      <div className="w-full text-right block">
        {authUser._id === userId ? (
          <button
            className="w-fit h-auto px-4 py-2 bg-green-400 text-white-pure text-sm rounded-sm hover:bg-green-500 transition-colors duration-150"
            onClick={() => setEditProfile(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button className="w-fit h-auto px-4 py-2 bg-theme-primary text-white-pure text-sm rounded-sm hover:bg-theme-secondary transition-colors duration-150">
            Send Message
          </button>
        )}

        {/* images container  */}
        <div className="w-full mt-4 h-auto bg-white-pure rounded-sm border">
          <div className="w-full h-auto flex justify-between items-center  p-4 border-b-[1px]">
            <h3 className="font-semibold">Images </h3>
            <button
              className="text-gray-shade2 hover:text-theme-secondary transition-colors duration-150"
              onClick={() => imageRef.current.click()}
            >
              <i className="fa-regular fa-image"></i>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                ref={imageRef}
                className="hidden"
              />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4 place-items-center p-4">
            {Images.map((image, id) => (
              <div
                className="cursor-pointer h-16 w-16 hover:scale-125 transition-transform duration-300"
                key={id}
              >
                <img
                  src={image}
                  alt=""
                  className="block w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightAside;
