import { useForm } from "react-hook-form";
import { getProfileById } from "../../App/Features/Profiles/selectors";
import { useDispatch } from "react-redux";
import { editUserProfileThunk } from "../../App/Features/Profiles/asyncThunks";

const EditProfile = ({ setForm, userId }) => {
  const dispatch = useDispatch();
  const profile = getProfileById(userId);
  const { location, education, experience, skills } = profile;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      ...profile,
      skills: skills.join(" "),
      city: location.city,
      country: location.country,
      educationPara: education?.para,
      educationTitle: education?.title,
      experiencePara: experience?.para,
      experienceTitle: experience?.title,
    },
  });
  const { errors } = formState;

  // handle edit profile
  const onSubmit = (data) => {
    const {
      country,
      city,
      experiencePara,
      experienceTitle,
      educationPara,
      educationTitle,
    } = data;
    const newProfile = {
      ...profile,
      location: {
        city,
        country,
        experience: { title: experienceTitle, para: experiencePara },
        education: { title: educationTitle, para: educationPara },
      },
    };
    dispatch(editUserProfileThunk(newProfile));
    setForm(false)
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#00000e70] z-20 flex items-center justify-center">
      <div id="wrapper" className="container">
        <div className="w-full h-full bg-white-pure block rounded-sm overflow-hidden">
          <h3 className="font-semibold text-sm text-white-pure bg-theme-primary p-4">
            Edit Profile
          </h3>
          <form
            className="p-8 space-y-4 overflow-y-auto max-h-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* TITLE FIELD */}
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <label htmlFor="" className="text-sm font-semibold px-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={`${
                    errors.firstName && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("firstName", {
                    required: "First Name field is required",
                  })}
                />
                <p className="error">{errors.firstName?.message}</p>
              </div>
              <div className="w-full">
                <label htmlFor="" className="text-sm font-semibold px-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`${
                    errors.lastName && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("lastName", {
                    required: "Last Name field is required",
                  })}
                />
                <p className="error">{errors.lastName?.message}</p>
              </div>
            </div>
            {/* END */}
            {/* SKILLS FIELD */}
            <div>
              <label htmlFor="" className="text-sm font-semibold px-2">
                Profession
              </label>
              <input
                type="text"
                placeholder="Profession"
                className={`${
                  errors.profession && "errorInput"
                } p-2 border text-sm w-full outline-none text-gray-para`}
                {...register("profession", {
                  required: "Profession field is required",
                })}
              />
              <p className="error">{errors.profession?.message}</p>
            </div>
            {/* END */}

            {/* PRICE FIELDS */}
            <div className="w-full">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Skills{" "}
                <span className="font-light text-gray-para">
                  ( must be seperated with spaces )
                </span>
              </label>
              <input
                type="text"
                placeholder="Skills"
                className={`p-2 border text-sm w-full outline-none text-gray-para`}
              />
            </div>
            {/* END */}

            {/* DESCRIPTION TEXTAREA */}
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <label htmlFor="" className="text-sm font-semibold px-2">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className={`${
                    errors.country && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("country", {
                    required: "Country field is required",
                  })}
                />
                <p className="error">{errors.country?.message}</p>
              </div>
              <div className="w-full">
                <label htmlFor="" className="text-sm font-semibold px-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className={`${
                    errors.city && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("city", {
                    required: "City field is required",
                  })}
                />
                <p className="error">{errors.city?.message}</p>
              </div>
            </div>

            {/* END */}

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Overview
              </label>
              <textarea
                placeholder="Overview"
                className={`${
                  errors.overview && "errorInput"
                } resize-none border p-2 text-sm text-gray-para w-full outline-none h-32"`}
                {...register("overview", {
                  required: "Overview field is required",
                })}
              ></textarea>
              <p className="error p-0">{errors.overview?.message}</p>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Experience Title
              </label>
              <input
                type="text"
                placeholder="Experience"
                className={` p-2 border text-sm w-full outline-none text-gray-para`}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Experience Paragraph
              </label>
              <textarea
                placeholder="Experience"
                className={`resize-none border p-2 text-sm text-gray-para w-full outline-none h-32"`}
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Education Title
              </label>
              <input
                type="text"
                placeholder="Education"
                className={`p-2 border text-sm w-full outline-none text-gray-para`}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold px-2">
                Education Paragraph
              </label>
              <textarea
                placeholder="Education"
                className={` resize-none border p-2 text-sm text-gray-para w-full outline-none h-32"`}
              ></textarea>
            </div>

            <div className="space-x-4">
              <button className="button" type="submit">
                Save
              </button>
              <button
                className="s-button"
                type="button"
                onClick={() => setForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
