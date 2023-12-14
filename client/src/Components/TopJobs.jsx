const TopJobs = () => {
  return (
    <div className="bg-white-pure border border-b-2">
      <div className="border-b-[1px] p-4 flex items-center justify-between">
        <h3 className="font-semibold">Top Jobs</h3>
        <span className="text-sm text-gray-para">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </span>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between gap-8">
          <div>
            <h4 className="capitalize font-semibold text-sm">
              Senior Product Designer
            </h4>
            <p className="capitalize text-sm text-gray-para line-clamp-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus provident, a accusamus impedit, quibusdam, aliquam
              suscipit enim perspiciatis omnis doloremque numquam consequatur
              distinctio!
            </p>
          </div>
          <p className="text-sm font-semibold">$25/hr</p>
        </div>
      </div>
    </div>
  );
};

export default TopJobs;
