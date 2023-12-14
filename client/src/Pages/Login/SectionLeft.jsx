import Logo from "../../Assets/Logo.png";
import MainImage from "../../Assets/login-main-img.png";

const SectionLeft = () => {
  return (
    <section className="p-8 w-full border-b-[1px] lg:border-r-[1px] lg:border-b-0 flex flex-col items-center justify-center gap-10 select-none">
      <article className="min-h-36 max-w-96 space-y-8 lg:p-8">
        {/* logo division */}
        <img src={Logo} alt="brand logo" className="h-11 w-13" />

        {/* description division */}
        <p className="text-gray-para text-sm leading-6 w-full">
          Workwise, is a global freelancing platform and social networking where
          businesses and independent professionals connect and collaborate
          remotely
        </p>
      </article>
      {/* signin image division for large divices */}
      <div className="h-44 w-full hidden lg:block">
        <img
          src={MainImage}
          alt="workwise"
          className="h-full w-auto object-cover"
        />
      </div>
    </section>
  );
};

export default SectionLeft;
