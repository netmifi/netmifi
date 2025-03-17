import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ResetScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // alert('You are on:'+)
    // if ("scrollRestoration" in window.history) {
    //   window.history.scrollRestoration = "manual";
    // }
    console.log(window.history);
    window.scrollTo({ behavior: "instant", top: 20000, left: 3000 });
    
  }, [pathname]);

  return null;
}

export default ResetScroll;
