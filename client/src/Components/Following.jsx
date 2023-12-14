import { getProfileById } from "../App/Features/Profiles/selectors";
import UserProfileLink from "./UserProfileLink";

const Following = ({ userId }) => {
  const profile = getProfileById(userId);
  const { profileImage, firstName, lastName, profession } = profile;

  return (
    <div className="w-full flex items-center px-4 gap-2">
      <div className="w-full inline-flex items-center gap-3">
        <div className="w-fit">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={profileImage} alt={firstName} className="w-full h-full block object-cover" />
        </div>
        </div>
        <div>
        <h4 className="text-sm w-fit font-semibold">{firstName} {lastName}</h4>
        <p className=" text-xs text-gray-para line-clamp-1">{profession}</p>
        </div>
      </div>
      <div>
        <UserProfileLink userId={userId}>
          <span className="text-sm"><i className="fa-solid fa-eye"></i></span>
        </UserProfileLink>
      </div>
    </div>
  );
};

export default Following;


// {/* <div className="flex items-center justify-center gap-5">
//         <div className="">
//           <img
//             src={profileImage}
//             alt={firstName}
//             className="w-8 h-8 object-cover m-auto rounded-full"
//           />
//         </div>
//         <p className="text-sm font-semibold w-full">
//           {firstName} {lastName}
//         </p>
//       </div>
//       <UserProfileLink userId={userId}>
//         <i
//           className="fa-solid fa-eye text-gray-para cursor-pointer"
//           title="view profile"
//         ></i>
//       </UserProfileLink> */}