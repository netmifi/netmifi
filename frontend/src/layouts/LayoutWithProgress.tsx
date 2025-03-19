// show loader app loads
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import NProgress from "nprogress";

const LayoutWithProgress = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Once the layout (and thus the new route's content) has rendered,
    // complete the progress.
    NProgress.done();
    console.log("Progress done for", location.pathname);
    return () => {
      NProgress.done();
      console.log(
        "progress finished",
        NProgress.isStarted(),
        NProgress.isRendered()
      );
    };
  }, [location]);

  return <Outlet />;
};

export default LayoutWithProgress;
