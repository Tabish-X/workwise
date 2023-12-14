import Promotion from "./Promotion";
import TopJobs from "./TopJobs";
import TopProfiles from "./TopProfiles";

const RightContainer = () => {
  return (
    <aside className="space-y-4 h-full lg:w-[25%]">
      <Promotion/>
      <TopJobs/>
      <TopProfiles/>
    </aside>
  );
};

export default RightContainer;
