import { useEffect } from "react";
import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../App/Features/Posts/asyncThunks";
import { getAuthProfile } from "../../App/Features/LoginedUser/authSlice";
import data from "../data";

const PostForm = ({ form, setForm }) => {
  const { categories, availabilities } = data;
  const dispatch = useDispatch();
  const authProfile = useSelector(getAuthProfile);
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => (document.body.style.overflowY = "scroll");
  }, []);

  // HANDLE POST SUBMIT
  const onSubmit = async (data) => {
    const post = {
      ...data,
      type: form.toLowerCase(),
      skills: data.skills.split(" "),
      country: authProfile.location.country,
    };
    dispatch(createPostThunk(post));
    setForm(null);
  };

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 h-full w-full bg-[#00000e70] z-20 flex items-center justify-center">
        <div id="wrapper" className="container">
          <div className="w-full h-full bg-white-pure block rounded-sm overflow-hidden">
            <h3 className="font-semibold text-sm text-white-pure bg-theme-primary p-4">
              Post a {form}
            </h3>
            <form
              className="p-8 space-y-4 overflow-y-scroll max-h-[500px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* TITLE FIELD */}
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className={`${
                    errors.title && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("title", {
                    required: "Title field is required",
                  })}
                />
                <p className="error">{errors.title?.message}</p>
              </div>
              {/* END */}

              {/* CATEGORY FIELD */}
              <div>
                <select
                  className={`${
                    errors.category && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para capitalize`}
                  {...register("category", {
                    required: "Category field is required",
                  })}
                >
                  <option value="">Category</option>
                  {categories.map((value, index) => (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  ))}
                </select>
                <p className="error">{errors.category?.message}</p>
              </div>
              {/* END */}

              {/* SKILLS FIELD */}
              <div>
                <input
                  type="text"
                  placeholder="Skills"
                  className={`${
                    errors.skills && "errorInput"
                  } p-2 border text-sm w-full outline-none text-gray-para`}
                  {...register("skills", {
                    required: "Skills field is required",
                  })}
                />
                <p className="error">{errors.skills?.message}</p>
              </div>
              {/* END */}

              {/* PRICE FIELDS */}
              <div className="lg:flex gap-4 w-full">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Price"
                    className={`${
                      errors.price && "errorInput"
                    } p-2 border text-sm w-full outline-none text-gray-para`}
                    {...register("price", {
                      required: "Price field is required",
                    })}
                  />
                  <p className="error">{errors.price?.message}</p>
                </div>
                {form === "Job" && (
                  <div className="w-full">
                    <select
                      className={`${
                        errors.availability && "errorInput"
                      } p-2 border text-sm w-full outline-none text-gray-para capitalize`}
                      {...register("availability", {
                        required: "Availability field is required",
                      })}
                    >
                      <option value="">Availability</option>
                      {availabilities.map((value, index) => (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <p className="error">{errors.availability?.message}</p>
                  </div>
                )}
              </div>
              {/* END */}

              {/* DESCRIPTION TEXTAREA */}
              <div>
                <textarea
                  placeholder="Description"
                  className={`${
                    errors.desc && "errorInput"
                  } resize-none border p-2 text-sm text-gray-para w-full outline-none h-28"`}
                  {...register("desc", {
                    required: "Description field is required",
                  })}
                ></textarea>
                <p className="error">{errors.desc?.message}</p>
              </div>
              {/* END */}

              <div className="space-x-4">
                <button className="button" type="submit">
                  Post
                </button>
                <button
                  className="s-button"
                  type="button"
                  onClick={() => setForm(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("popup-container")
  );
};

export default PostForm;
