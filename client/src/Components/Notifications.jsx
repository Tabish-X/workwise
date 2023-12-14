import { useSelector } from "react-redux";
import { getAuthUser } from "../App/Features/LoginedUser/authSlice";
import Notification from "./Notification";
import { Link } from "react-router-dom";

const Notifications = () => {
  const authUser = useSelector(getAuthUser);
  const { notifications } = authUser;
  const sortedNotifications = notifications.slice().sort((a, b) => new Date(b.time) - new Date(a.time))

  return (
    <div className="absolute top-full right-0 min-[1260px]:right-52 shadow-xl w-80 h-fit bg-white-pure rounded-b-md transition-all duration-150 overflow-hidden z-10">
      <h3 className="p-2 font-semibold text-center">Notifications</h3>

      {notifications.length ? (
        <div className="h-64 overflow-y-auto space-y-4">
          {sortedNotifications.map((notification) => (
            <Link to={notification.redirect} key={notification._id}>
              <Notification
                notification={notification}
                
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center p-8 border-t text-sm font-semibold text-gray-shade2">
          No Notifications
        </p>
      )}
    </div>
  );
};

export default Notifications;
