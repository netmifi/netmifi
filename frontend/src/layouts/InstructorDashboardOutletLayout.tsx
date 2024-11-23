// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Sidebar from "./navbar/dashboard/Sidebar";
// import TopBar from "./navbar/dashboard/TopBar";
// import { useState } from "react";
// import BreadcrumbNav from "@/components/BreadcrumbNav";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// const InstructorDashboardOutletLayout = () => {
//   const { pathname } = useLocation();
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   if (pathname === "/dashboard" || pathname === "/dashboard/") {
//     return <Navigate to="/dashboard/home" />;
//   }

//   return (
//     <SidebarProvider>
//       // {/* <div className="flex w-full max-w-screen break-all"> */}
//       {/* <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} /> */}
//       <div className="w-full">
//         <header className="sticky top-0 z-20 bg-white shadow">
//           <TopBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
//         </header>

//         <div className="w-full max-w-full text-wrap max-container px-4 pt-3">
//           <BreadcrumbNav />
//           <SidebarTrigger />
//           <Outlet />
//         </div>
//       </div>
//       {/* <div className={cn("max-container flex flex-col gap-28 lg:ml-20")}> */}
//       {/* </div> */}
//       {/* </div> */}
//     </SidebarProvider>
//   );
// };

// export default InstructorDashboardOutletLayout;
