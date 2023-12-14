import { Link } from "react-router-dom";

const NotAvailable = () => {
  return (
    <main className="absolute h-full w-full top-0 left-0 bg-white-gray flex pt-40 pl-20 z-50 select-none">
      <div className="text-left flex gap-6 flex-col">
        <h1 className="text-4xl font-bold text-theme-secondary">Sorry. Can't access right now.</h1>
        <p className="text-theme-primary">
          This page is currently in development. <br /> <strong>It will take a while
          before it is publicaly accessable.</strong>
        </p>
        <Link to={"/"}>
          <button className="button">Go to Home Page</button>
        </Link>
      </div>
    </main>
  );
};

export default NotAvailable;
