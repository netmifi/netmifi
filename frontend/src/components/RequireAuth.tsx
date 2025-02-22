import { useApp } from "@/app/app-provider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { isAuth, isAppLoading } = useApp();
  const { pathname } = useLocation();

  // Optionally render a loader or nothing while authentication state is being determined
  if (isAppLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    // Redirect to login if not authenticated
    return (
      <Navigate to="/auth/sign-in" state={{ returnUrl: pathname }} replace />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
