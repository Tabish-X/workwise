import { useEffect } from "react";
import ReactDOM from "react-dom";

const PopupImage = ({ image, setImage }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [image]);

  return ReactDOM.createPortal(
    <>
      <div>
        <div
          className={`fixed top-0 left-0 h-full w-full bg-[#00000e70]
           flex items-center justify-center`}
        >
          <i
            className="fa-solid fa-xmark absolute top-8 right-8 l md:text-4xl text-white-pure text-2xl cursor-pointer"
            onClick={() => setImage("")}
          ></i>
          <div className="block rounded-lg overflow-hidden ">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#popup-container")
  );
};

export default PopupImage;
