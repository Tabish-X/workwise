import { getProfileById } from "../../App/Features/Profiles/selectors";

const InfoTab = ({ userId }) => {
  const authProfile = getProfileById(userId);
  const { overview, education, experience, location, skills } = authProfile;
  return (
    <article className="py-5">
      {/* // Overvoiew div  */}
      <div className="px-4 py-8 text-left bg-white-pure border rounded-sm">
        <h3 className="font-bold mb-3">Overview</h3>
        <p className="text-sm text-gray-para">{overview}</p>
      </div>
      {/* //experience div  */}
      {experience && (
        <div className="mt-5 px-4 py-8 text-left bg-white-pure border rounded-sm">
          <h3 className="font-bold mb-3">Experience</h3>

          <div className="mt-3 ">
            <h4 className="capitalize text-sm font-semibold mb-2">
              {experience.title}
            </h4>
            <p className="text-sm text-gray-para">{experience.para}</p>
          </div>
        </div>
      )}
      {/* END */}
      {/* //education div  */}
      {education && (
        <div className="mt-5 px-4 py-8 text-left bg-white-pure border rounded-sm">
          <h3 className="font-bold mb-3">Education</h3>

          <div className="mt-3 ">
            <h4 className="capitalize text-sm font-semibold mb-2">
              {education.title}
            </h4>
            {/* time span  */}
            <span className="text-sm text-gray-para">{education.time}</span>
            <p className="text-sm text-gray-para">{education.para}</p>
          </div>
        </div>
      )}
      {/* END */}
      {/* //Location div  */}
      <div className="mt-5 px-4 py-8 text-left bg-white-pure border rounded-sm">
        <h3 className="font-bold mb-3">Location</h3>

        <div className="mt-3 ">
          <h4 className="capitalize text-sm font-semibold mb-2">
            {location.country}
          </h4>
          <p className="text-sm text-gray-para">{location.city}</p>
        </div>
      </div>
      {/* END */}
      <div className="mt-5 px-4 py-8 text-left bg-white-pure border rounded-sm">
        <h3 className="font-bold mb-3">Skills</h3>

        <div className="mt-3 flex flex-wrap w-full gap-3">
          {skills.map((skill, id) => (
            <p
              className="py-2 text-sm px-4 text-gray-shade2 bg-white-gray rounded-full"
              key={id}
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
      {/* END */}
    </article>
  );
};

export default InfoTab;
