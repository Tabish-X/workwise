import { formatDistanceToNow, parseISO } from "date-fns";

const NotificationTime = ({timeSpan}) => {
  let timeAgo = "";
  if (timeSpan) {
    const date = parseISO(timeSpan);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = timePeriod[0].toUpperCase() + timePeriod.substring(1);
  }
  return (
    <>
      <span className="text-orange-600 text-xs font-semibold">
        <i>{timeAgo} ago</i>
      </span>
    </>
  );
};

export default NotificationTime;
