import { useEffect } from "react";
import { ClockLoader } from "react-spinners";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="absolute h-full w-full top-0 left-0 bg-theme-primary flex items-center justify-center z-50 select-none">

        <ClockLoader color="#fff" size={100}/>
    </div>
  );
};

export default Loading;
