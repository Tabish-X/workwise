import { useDispatch } from "react-redux";
import { signOutThunk } from "../../App/Features/LoginedUser/UserThunks";

const Dropdown = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOutThunk());
  };
  return (
    <div className="absolute top-full right-0 shadow-xl w-32 bg-white-pure rounded-b-md transition-all duration-150 overflow-hidden z-10">
      <h3 className="p-2 font-semibold text-center ">Setting</h3>
      <span className="text-sm border-y-[1px] block  p-2 cursor-pointer">
        <p className="p-1">Account Setting</p>
        <p className="p-1">privacy</p>
        <p className="p-1">faqs</p>
        <p className="p-1">terms & conditions</p>
      </span>
      <h3 className="p-2 font-semibold text-center">
        <button onClick={handleLogout}>logout</button>
      </h3>
    </div>
  );
};

export default Dropdown;
