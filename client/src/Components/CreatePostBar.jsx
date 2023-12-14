import { useSelector } from "react-redux";
import { getAuthProfile } from "../App/Features/LoginedUser/authSlice";
import { useState } from "react";
import PostForm from "./posts/Form";

const CreatePostBar = ({ job, project }) => {
  const profile = useSelector(getAuthProfile);
  const { profileImage, firstName } = profile;
  const [form, setForm] = useState("");
  if (form) {
    return <PostForm form={form} setForm={setForm} />;
  }

  return (
    <div className="p-6 border border-t-4 border-t-theme-secondary bg-white-pure flex items-center justify-between w-full">
      <div className="w-12 h-12 block rounded-full overflow-hidden">
        <img
          src={profileImage}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-x-2">
        {project && (
          <button
            className="px-4 py-2 bg-white-gray rounded-sm text-sm text-gray-shade2 transition-colors duration-200 hover:bg-theme-secondary hover:text-white-pure"
            onClick={() => setForm("Project")}
          >
            Post a Project
          </button>
        )}
        {job && (
          <button
            className="px-4 py-2 bg-theme-primary rounded-sm text-sm text-white-pure transition-colors duration-200 hover:bg-theme-secondary"
            onClick={() => setForm("Job")}
          >
            Post a Job
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePostBar;
