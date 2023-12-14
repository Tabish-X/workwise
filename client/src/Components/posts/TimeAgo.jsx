import { parseISO, formatDistanceToNow, format } from "date-fns";

const TimeAgo = ({ timeSpan }) => {
  let timeAgo = "";
  if (timeSpan) {
    const date = parseISO(timeSpan);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = timePeriod[0].toUpperCase() + timePeriod.substring(1)
  }
  return (
    <>
      <span className="text-gray-shade2 text-xs">
        <i className="fa-solid fa-clock"></i> <i>{timeAgo} ago</i>
      </span>
    </>
  );
};

export default TimeAgo;
