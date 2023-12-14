import { toast } from "react-toastify";

const Setprofile1 = ({ profile, setProfile, setProfileTab }) => {
  const handleNext = (e) => {
    e.preventDefault();
    const { firstName, lastName, profession, birthday } = profile;
    if (!firstName || !lastName || !profession || !birthday) {
      return toast.error("All fields are required");
    }
    setProfileTab("images");
  };

  return (
    <>
      <p className="text-sm text-gray-para my-4">Enter basic details</p>
      <form
        className="w-full h-full space-y-6"
        onSubmit={handleNext}
        noValidate
      >
        <div>
          <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
            <i className="fa-solid fa-user text-gray-para"></i>
            <input
              type="text"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="First Name"
              autoFocus
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-solid fa-users text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-solid fa-book text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Profession"
            value={profile.profession}
            onChange={(e) =>
              setProfile({ ...profile, profession: e.target.value })
            }
          />
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-solid fa-calendar text-gray-para"></i>
          <input
            type="date"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Birthday"
            value={profile.birthday}
            onChange={(e) =>
              setProfile({ ...profile, birthday: e.target.value })
            }
          />
        </div>

        <button className="button">Next</button>
      </form>
    </>
  );
};

export default Setprofile1;
