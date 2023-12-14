import LogoIcon from "../Assets/LogoIcon.png";
import {Link} from "react-router-dom"

const Promotion = () => {
  return (
    <div className="bg-white-pure text-center border border-b-2">
      <div className="border-b-[1px] p-6 space-y-2">
        <div className="w-14 h-1w-14 block m-auto">
          <img src={LogoIcon} alt="workwise icon" />
        </div>
        <h3 className="text-sm font-semibold capitalize">
          track your time on workwise
        </h3>
        <p className="text-sm text-gray-para">Pay only for the hours worked</p>
      </div>

      <div className="p-4 space-y-1 flex flex-col">
        <button className="">
          <Link to="/login" className="uppercase font-semibold text-sm">
            sign up
          </Link>
        </button>
        <button className="">
          <Link to="/not-available" className="text-red-500 text-sm">
            Learn More
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Promotion;
