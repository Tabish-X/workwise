import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, } from "react-redux";
import { signInUserThunk } from "../../App/Features/LoginedUser/UserThunks";

const Signin = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(signInUserThunk(data))
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
              !errors.email ? "border-white-shade border" : "errorInput"
            } flex items-center rounded-sm px-4 w-full h-10 space-x-4`}
          >
            <i className="fa-solid fa-envelope text-gray-para"></i>
            <input
              type="email"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Email"
              autoFocus
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
              })}
            />
          </div>
          <p className="error">{errors.password?.message}</p>
        </div>

        <button className="py-2 px-7 bg-theme-primary hover:bg-theme-secondary transition-colors duration-150 rounded-sm text-white-pure">
          Sign in
        </button>
      </form>
    </>
  );
};

export default Signin;
