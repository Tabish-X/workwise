import { getUserById } from "../App/Features/Users/selectors";
import Following from "./Following";

const Followings = ({userId}) => {
    const user = getUserById(userId)
  return (
    <div className="w-full bg-white-pure mt-8 border">
      <h3 className="py-4 pl-6 border-b-[1px] font-semibold text-left">
        People You Follow
      </h3>

      {/* <p className="p-4 text-sm text-gray-para text-left uppercase">No friends To show</p> */}

      <div className="space-y-6 py-6">
        {/* //friends */}
        {user?.following.map((userId) => (
          <Following userId={userId} key={userId}/>
        ))}
      </div>

      <p className="text-center text-sm text-orange-600 font-bold cursor-pointer pb-4">
        View full list
      </p>
    </div>
  );
};

export default Followings;
