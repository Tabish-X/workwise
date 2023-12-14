const SocialLinks = ({ profile, setProfile, HandleProfileSubmit }) => {
  return (
    <>
      <p className="text-sm text-gray-para my-4">
        Add social links <span className="font-thin">(optional)</span>
      </p>
      <form
        className="w-full h-full space-y-6"
        onSubmit={HandleProfileSubmit}
        noValidate
      >
        <div>
          <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
            <i className="fa-brands fa-facebook-f text-gray-para"></i>
            <input
              type="text"
              className="outline-none w-full text-sm py-1 text-gray-para "
              placeholder="Facebook"
              autoFocus
              value={profile.facebook}
              onChange={(e) =>
                setProfile({ ...profile, facebook: e.target.value })
              }
            />
          </div>
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-brands fa-youtube text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Youtube"
            value={profile.youtube}
            onChange={(e) =>
              setProfile({ ...profile, youtube: e.target.value })
            }
          />
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-brands fa-twitter text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Twitter"
            value={profile.twitter}
            onChange={(e) =>
              setProfile({ ...profile, twitter: e.target.value })
            }
          />
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-brands fa-github text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Github"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          />
        </div>

        <div className="border-white-shade border flex items-center rounded-sm px-4 w-full h-10 space-x-4">
          <i className="fa-solid fa-globe text-gray-para"></i>
          <input
            type="text"
            className="outline-none w-full text-sm py-1 text-gray-para "
            placeholder="Website"
            value={profile.website}
            onChange={(e) =>
              setProfile({ ...profile, website: e.target.value })
            }
          />
        </div>

        <button className="button">Create Profile</button>
      </form>
    </>
  );
};

export default SocialLinks;
