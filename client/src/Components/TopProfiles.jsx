const TopProfiles = () => {
  return (
    <div className="bg-white-pure border border-b-2">
      <div className="border-b-[1px] p-4 flex items-center justify-between">
        <h3 className="font-semibold">Most Viewed People</h3>
        <span className="text-sm text-gray-para">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </span>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center justify-center gap-2">
            <div className="h-10 w-10 block">
              <img
                src="https://gambolthemes.net/workwise-new/images/resources/s1.png"
                alt=""
                className="w-full wh-full object-cover"
              />
            </div>
            <div>
              <h4 className="capitalize font-semibold text-sm">
                Jessica William
              </h4>
              <p className="capitalize text-sm text-gray-para line-clamp-1">
                Graphic Designer
              </p>
            </div>
          </div>
          <button className="text-sm border flex items-center justify-center h-8 w-8 text-white-shade transition-all duration-300 hover:text-white-pure hover:bg-theme-secondary hover:border-theme-secondary">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopProfiles;
