import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { useApp } from "@/app/app-provider";
import {
  AlertDialogTitle,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Home, Key, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROLES_LIST } from "@/constants";
import { FaKey } from "react-icons/fa";

const InstructorDashboardOutletLayout = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useApp();
  const { pathname } = useLocation();

  if (pathname.includes("/dashboard") && !isAuth) {
    navigate(-1);
    return <></>;
  }

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
