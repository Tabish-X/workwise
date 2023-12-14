import { toast } from "react-toastify";
import { imageToBase64 } from "./imageToBase64";

export const setImage = async (e, setCoverImage) => {
  const image = e.target.files[0];
  if (image) {
    let imageSize = image.size / 1024;
    if (imageSize < 100) {
      try {
        const convert = await imageToBase64(image);
        setCoverImage(convert);
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Image must be less than 100kb");
    }
  } else {
    toast.error("Please select an image first");
  }
};
