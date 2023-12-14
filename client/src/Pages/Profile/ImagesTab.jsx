import { useState } from "react";
import PopupImage from "./PopupImage";
import { Images } from "./api";

const ImagesTab = () => {
  const [showImage, setShowImage] = useState("");

  return (
    <section className="w-full py-5 relative">
      <div className="p-4 bg-white-pure rounded-sm border ">
        <h3 className="font-semibold mb-4">Images</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 place-items-center gap-4">
          {Images.map((image, id) => (
            <div
              className="images_tab__image w-32 h-32 relative  rounded-md cursor-pointer overflow-hidden"
              key={id}
            >
              <img src={image} alt="" className="w-full h-full block object-cover" />
              <div
                className={`hover_effect_to_image absolute top-0 left-0 w-full h-0 bg-[#000000b0] flex items-center justify-center overflow-hidden transition-all duration-200`}
                onClick={() => setShowImage(image)}
              >
                <span className="text-gray-300 font-thin">view image</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showImage ? (
        <PopupImage image={showImage} setImage={setShowImage} />
      ) : (
        ""
      )}
    </section>
  );
};

export default ImagesTab;
