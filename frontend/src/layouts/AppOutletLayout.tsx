import { cn } from "@/lib/utils";
import { useStoreState } from "@/store/store";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

const AppOutletLayout = () => {
  const isAuth = useStoreState((state) => state.auth.isAuth);

  return (
    <>
      <Navbar />
      <div
        className={cn("max-container flex flex-col gap-28", {
          "md:ml-20": isAuth,
        })}
      >
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default AppOutletLayout;
