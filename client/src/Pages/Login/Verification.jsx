import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { authApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { signInUserThunk } from "../../App/Features/LoginedUser/userThunks";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";

const Verification = () => {
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser)

  // const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [div, setDiv] = useState("sendmail"); // sendmail, entercode, changeemail
  const dispatch = useDispatch();

  const sendVerificationEmail = async () => {
    try {
      await authApi.post(
        "/sendmail",
        { email: authUser.email },
        { withCredentials: true }
      );
      toast.info("Email has been sent");
      setDiv("entercode");
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.message);
      }
      return toast.error(error.message);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();

    try {
      await authApi.post(
        "verifyemail",
        { email: authUser.email, verificationCode: code },
        { withCredentials: true }
      );
      toast.success("email has been verified");
      dispatch(signInUserThunk(authUser));
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.message);
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full space-y-8">
      {div === "sendmail" ? (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">We need to verify your email</h3>
            <p className="text-sm text-gray-para">
              Send verification code to <strong>{authUser.email}</strong>
            </p>
          </div>

          <button
            className="py-2 px-7 bg-theme-primary hover:bg-theme-secondary transition-colors duration-150 rounded-sm text-white-pure"
            onClick={sendVerificationEmail}
          >
            Send
          </button>
        </div>
      ) : div === "entercode" ? (
        <form className="w-full space-y-8" onSubmit={verifyEmail}>
          <div>
            <h3 className="font-semibold mb-2">Verify your email address</h3>
            <p className="text-sm text-gray-para">
              An email has been to <strong>{authUser.email}</strong>
            </p>
          </div>
          <div className="flex items-center rounded-sm px-4 w-full h-10 space-x-4 border-white-shade border">
            <i className="fa-solid fa-user text-gray-para"></i>
            <input
              type="text"
              maxLength={10}
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Verification Code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button className="py-2 px-7 bg-theme-primary hover:bg-theme-secondary transition-colors duration-150 rounded-sm text-white-pure">
            Verify
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Verification;
