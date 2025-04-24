import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./navbar/user/Topbar";
import AppSidebar from "./navbar/user/AppSidebar";
import { useSidebar } from "@/components/ui/sidebar";
import GuestNavbar from "./navbar/guest/Index";
import FirstVisitAlert from "@/components/FirstVisitAlert";
import { useEffect } from "react";
import { useApp } from "@/app/app-provider";

export const MainContent = ({ state }: { state: userType["type"] }) => {
  // layout component is the wrapper for ur application
  const { open, setOpen, isMobile } = useSidebar();

  useEffect(() => {
     isMobile ? setOpen(false) : false ;
  }, [isMobile, setOpen]);
  return (
    <div className="flex-grow w-full h-full overflow-y-auto transition-all duration-300 ease-in-out">
      {state === "guest" ? (
        <GuestNavbar />
      ) : (
        <TopBar state={state} open={open} />
      )}
      <main className=" ">
        <div className="flex flex-col gap-28 h-[90%] mb-32">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

const AppOutletLayout = () => {
  const { isAuth } = useApp();
  const { pathname } = useLocation();
  const state = !isAuth
    ? "guest"
    : pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/dashboard")
    ? "instructor"
        : "user";
  


  if (pathname === "/") {
    return <Navigate to="/home" />;
  }


  return (
    <div className="flex h-screen overflow-hidden bg-background w-full">
      <FirstVisitAlert />
      {state !== "guest" && <AppSidebar state={state} />}
      <MainContent state={state} />
    </div>
  );
};

export default AppOutletLayout;
