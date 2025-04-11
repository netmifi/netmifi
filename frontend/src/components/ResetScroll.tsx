import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// function ResetScroll() {
//   const { pathname } = useLocation();

//   import { useEffect, useLayoutEffect(() => {
//     setTimeout(() => window.scrollTo(0, 0), 100);
//     // window.scrollTo(0, 0); // Reset scroll to top
//     // alert('You are on:'+)
//     // if ("scrollRestoration" in window.history) {
//     //   window.history.scrollRestoration = "manual";
//     console.log(window.history.state);
//     // }
//   }, [pathname]);

//   return null;
// }

const ResetScroll = ({ children }: {children: React.ReactNode}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

export default ResetScroll;
