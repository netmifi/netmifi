import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ResetScroll() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // alert('You are on:'+)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      console.log(window.history.state);
    }
    window.scrollTo({ behavior: "instant", top: 0, left: 0 });
    console.log("restoring");
  }, [pathname]);

  return null;
}

export default ResetScroll;
