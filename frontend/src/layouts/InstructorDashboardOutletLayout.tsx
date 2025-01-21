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
import { Key } from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";

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

  if (user.roles.instructor === false) {
    return (
      // <Alert AlertDialog open>
      <AlertDialog open>
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogHeader className="p-5 bg-low-red text-red rounded-full mb-3">
            <Key className="size-16" />
          </AlertDialogHeader>
          <AlertDialogTitle className="font-light text-base sm:text-lg">
            Want to access this feature?
          </AlertDialogTitle>

          <AlertDialogAction>
            <Link to='/auth/welcome/instructor-application' state={{returnUrl: pathname}}>Become an instructor</Link>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      // </Alert>
    );
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
