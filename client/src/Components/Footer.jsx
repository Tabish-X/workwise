import { Link } from "react-router-dom";
import LogoIcon from "../Assets/LogoIcon.png";
import data from "./data";

const Footer = ({sm, white}) => {
  const footerClassess = `${sm && "lg:p-4 lg:flex-col border h-full"} ${white ? "bg-white-pure text-gray-shade2": "bg-theme-primary text-white-pure "} flex flex-col lg:flex-row w-full items-center justify-between gap-4 lg:p-8 p-4`
  return (
    <footer className={footerClassess}>
      {/* for links division  */}
      <div className="flex flex-wrap items-center justify-center">
        {data.footerLinks.map((value, index) => {
          const { text, link } = value;
          return (
            <Link to={link} className="capitalize text-sm" key={index}>
              |<span className="px-2">{text}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        <img src={LogoIcon} alt="logo" className="h-6" />
        <span className="text-sm">&copy; Copyright 2019</span>
      </div>
    </footer>
  );
};

export default Footer;
