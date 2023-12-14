import { getProfileById } from "../App/Features/Profiles/selectors";
import NotificationTime from "./NotificationTime";

const Notification = ({ notification }) => {
  const { message, userId, time, isReaded } = notification;
  const profile = getProfileById(userId);
  const { profileImage, firstName, lastName } = profile;
  return (
    <div className="flex items-center gap-2 border-y p-2 bg-gray-100">
      <div className="w-fit">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={profileImage}
          alt={firstName}
          className="w-full h-full block object-cover"
        />
      </div>
      </div>
      <div className="flex items-start">
        <div className="">
          <p className="text-sm text-gray-para w-full">
            <strong className="text-black-pure">
              {firstName} {lastName}{" "}
            </strong>
            {message}
          </p>
          <NotificationTime timeSpan={time} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
