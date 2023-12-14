import { toast } from "react-toastify";

const imageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    if (image && image.size / 1024 > 100) {
      reject("Image must be less than 100kb");
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.result);
      };
    }
  });
};

export { imageToBase64 };
