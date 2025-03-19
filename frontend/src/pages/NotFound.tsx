import { AiFillWarning } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  // const {isAuth} = useApp();
  return (
    <main
      className={
        "max-container h-screen flex flex-col gap-px justify-center items-center"
      }
    >
      <AiFillWarning className="fill-red text-9xl" />
      <h2 className="text-lg text-center lg:text-xl">
        <span className="border-r-2 border-primary/40 pr-2 text-red">404</span>
        <span className="pl-2">
          Page not found
          <NavLink
            to="/home"
            className="text-blue underline underline-offset-4 ml-1"
          >
            Back to Home
          </NavLink>
        </span>
      </h2>
    </main>
  );
};

export default NotFound;
