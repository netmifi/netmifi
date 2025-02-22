import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export const PageProgressStart = () => {
  const location = useLocation();

  useEffect(() => {
    // NProgress.start();
    // console.log("progress started", NProgress.isStarted(), NProgress.isRendered());
    // No cleanup here!

    return ()=> { NProgress.done();  console.log("progress finished", NProgress.isStarted(), NProgress.isRendered());}
  }, [location]);

  return <></>;
};



export const WithPageTransition = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    NProgress.done();
    console.log("progress finished", NProgress.isStarted(), NProgress.isRendered());
  }, []);

  return <>{children}</>;
};

export default WithPageTransition;




