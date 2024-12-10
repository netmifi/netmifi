import { Navigate, Outlet, useLocation } from "react-router-dom";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const InstructorDashboardOutletLayout = () => {
  const { pathname } = useLocation();

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="px-4 pt-2">
        <BreadcrumbNav />
      </section>
      <Outlet />
    </div>
  );
};

export default InstructorDashboardOutletLayout;
