import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Info = ({ profile, setProfile, setProfileTab, handleSubmit }) => {
  const handleNext = (e) => {
    e.preventDefault()
    const { overview, country, city } = profile;
    if (!overview || !country || !city) {
      return toast.error("Overview & location is required");
    }
    handleSubmit(e)
  };
  


  return (
    <>
      <p className="text-sm text-gray-para my-4">Tell us about yourself</p>
      <form
        className="w-full h-full space-y-6"
        onSubmit={handleNext}
        noValidate
      >
        {/* OVERVIEW AND ABOUT FIELD */}
        <div className="flex flex-col rounded-sm h-24 w-full">
          <label
            htmlFor="overview"
            className="text-sm text-gray-para mb-1 font-semibold"
          >
            About/Overview:
          </label>
          <textarea
            id="overview"
            className="outline-none text-sm border p-2 border-white-shade w-full h-full text-gray-para resize-none"
            value={profile.overview}
            onChange={(e) =>
              setProfile({ ...profile, overview: e.target.value })
            }
          ></textarea>
        </div>

        {/* EXPERIENCE FIELD */}
        <div className="flex flex-col gap-2 rounded-sm h-fit w-full">
          <label
            htmlFor="overview"
            className="text-sm text-gray-para mb-1 font-semibold cursor-pointer"
          >
            Experience: <span className="font-thin">Optional</span>
          </label>
          <div className=" flex flex-col items-center rounded-sm w-full h-24 space-y-2">
            <input
              type="text"
              className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
              placeholder="Title"
              value={profile.experienceTitle}
              onChange={(e) =>
                setProfile({ ...profile, experienceTitle: e.target.value })
              }
            />
            <textarea
              id="overview"
              className="outline-none text-sm border p-1 border-white-shade w-full h-full text-gray-para resize-none"
              value={profile.experiencePara}
              onChange={(e) =>
                setProfile({ ...profile, experiencePara: e.target.value })
              }
              placeholder="Small paragraph"
            ></textarea>
          </div>
        </div>

        {/* EDUCATION FIELD */}
        <div className="flex flex-col gap-2 rounded-sm h-fit w-full">
          <label
            htmlFor="overview"
            className="text-sm text-gray-para mb-1 font-semibold cursor-pointer"
          >
            Recent Education: <span className="font-thin">Optional</span>
          </label>
          <div className=" flex flex-col items-center rounded-sm w-full h-fit space-y-2">
            <input
              type="text"
              className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
              placeholder="Title"
              value={profile.educationTitle}
              onChange={(e) =>
                setProfile({ ...profile, educationTitle: e.target.value })
              }
            />
            <div className="flex justify-between w-full gap-2">
              <input
                type="number"
                className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
                placeholder="From"
                value={profile.educationFrom}
                onChange={(e) =>
                  setProfile({ ...profile, educationFrom: e.target.value })
                }
              />
              <input
                type="number"
                className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
                placeholder="To"
                value={profile.educationTo}
                onChange={(e) =>
                  setProfile({ ...profile, educationTo: e.target.value })
                }
              />
            </div>
            <textarea
              id="overview"
              className="outline-none text-sm border p-1 border-white-shade w-full h-full text-gray-para resize-none"
              value={profile.educationPara}
              onChange={(e) =>
                setProfile({ ...profile, educationPara: e.target.value })
              }
              placeholder="Small paragraph"
            ></textarea>
          </div>
        </div>

        {/* LOCATION FIELD */}
        <div className="flex flex-col gap-2 rounded-sm h-fit w-full">
          <label
            htmlFor="overview"
            className="text-sm text-gray-para mb-1 font-semibold cursor-pointer"
          >
            Location:
          </label>
          <div className=" flex flex-col items-center rounded-sm w-full h-fit space-y-2">
            <div className="flex justify-between w-full gap-2">
              <input
                type="text"
                className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
                placeholder="Country"
                value={profile.country}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
              />
              <input
                type="text"
                className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
                placeholder="City"
                value={profile.city}
                onChange={(e) =>
                  setProfile({ ...profile, city: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* SKILLS FIELD */}
        <div className="flex flex-col gap-2 rounded-sm h-fit w-full">
          <label
            htmlFor="overview"
            className="text-sm text-gray-para mb-1 font-semibold cursor-pointer"
          >
            Skills: <span className="font-thin">Optional</span>
          </label>
          <div className=" flex flex-col items-center rounded-sm w-full h-fit space-y-2">
              <input
                type="text"
                className="outline-none w-full text-sm p-1 text-gray-para border-white-shade border "
                placeholder="eg.(Html, Css, Photoshop, etc)"
                value={profile.skills}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value })
                }
              />
          </div>
        </div>

        <button className="button">Next</button>
      </form>
    </>
  );
};

export default Info;
