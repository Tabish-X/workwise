import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUserThunk } from "../../App/Features/LoginedUser/userThunks";

const Signup = ({ setCurrentTab }) => {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const newData = {
      username: data.username.split(" ").join("").toLowerCase(),
      email: data.email.toLowerCase(),
      password: data.password,
    };

    dispatch(signupUserThunk(newData));
    setCurrentTab("/verification");
  };

  return (
    <>
      <form
        className="w-full space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <div
            className={`${
              !errors.username ? "border-white-shade border" : "errorInput"
            } flex items-center rounded-sm px-4 w-full h-10 space-x-4`}
          >
            <i className="fa-solid fa-user text-gray-para"></i>
            <input
              type="text"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Username (eg. johndoe)"
              autoFocus
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          <p className="error">{errors.username?.message}</p>
        </div>

        <div>
          <div
            className={`${
              !errors.email ? "border-white-shade border" : "errorInput"
            } flex items-center rounded-sm px-4 w-full h-10 space-x-4`}
          >
            <i className="fa-solid fa-envelope text-gray-para"></i>
            <input
              type="email"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: "Email is not valid",
                },
              })}
            />
          </div>
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <div
            className={`${
              !errors.password ? "border-white-shade border" : "errorInput"
            } flex items-center rounded-sm px-4 w-full h-10 space-x-4`}
          >
            <i className="fa-solid fa-lock text-gray-para"></i>
            <input
              type="password"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                // pattern: {
                //   value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
                //   message: "Password is not strong",
                // },
              })}
            />
          </div>
          <p className="error">{errors.password?.message}</p>
        </div>

        <div>
          <div
            className={`${
              !errors.cpassword ? "border-white-shade border" : "errorInput"
            } flex items-center rounded-sm px-4 w-full h-10 space-x-4`}
          >
            <i className="fa-solid fa-lock text-gray-para"></i>
            <input
              type="password"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Confirm Password"
              {...register("cpassword", {
                required: "Confirm password is required",
                validate: (data) => {
                  if (data !== getValues().password) {
                    return "password does not match";
                  }
                },
              })}
            />
          </div>
          <p className="error">{errors.cpassword?.message}</p>
        </div>

        <button
          type="submit"
          className="py-2 px-7 bg-theme-primary hover:bg-theme-secondary transition-colors duration-150 rounded-sm text-white-pure"
        >
          Get Started
        </button>
      </form>
    </>
  );
};

export default Signup;
