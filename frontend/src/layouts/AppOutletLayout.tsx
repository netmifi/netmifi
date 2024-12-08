import { cn } from "@/lib/utils";
import { useStoreState } from "@/store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./navbar/user/Topbar";
import AppSidebar from "./navbar/user/AppSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { useApp } from "@/app/app-provider";
import GuestNavbar from "./navbar/guest/Index";

export const MainContent = ({ state }: { state: userType["type"] }) => {
  const { open } = useSidebar();

  return (
    <div className="flex-grow w-full h-full overflow-y-auto transition-all duration-300 ease-in-out">
      {state === "guest" ? (
        <GuestNavbar />
      ) : (
        <TopBar state={state} open={open} />
      )}
      <main className="max-container">
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
      {state !== "guest" && <AppSidebar state={state} />}{" "}
      <MainContent state={state} />
    </div>
  );
};

export default AppOutletLayout;
