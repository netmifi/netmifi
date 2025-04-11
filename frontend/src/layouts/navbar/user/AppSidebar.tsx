import { useStoreActions, useStoreState } from "@/store/store";
import { instructorDashboardLinks, navLinks } from "@/constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaTimes, FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/useWindowSize";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaFile, FaMicrophone } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  CogIcon,
  File,
  HelpCircleIcon,
  MicIcon,
  Phone,
  Users,
  XIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { CustomLogo } from "@/components/CustomLogo";
import SidebarProfile from "@/components/navbar/SidebarProfile";
import { aboutHero } from "@/assets/images";
import { useApp } from "@/app/app-provider";

export const NavSkeleton = () => {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const AppSidebar = ({ state }: { state: userType["type"] }) => {
  const links = state === "instructor" ? instructorDashboardLinks : navLinks;
  const { user } = useApp();

  const fullName = user.firstName + " " + user.lastName;

  const { pathname } = useLocation();

  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (pathname) {
      if (isMobile) setOpenMobile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Sidebar className="flex-shrink-0 w-64 transition-all duration-300 ease-in-out">
      <SidebarHeader className="p-5 flex items-center relative">
        <SidebarTrigger className="absolute top-0 right-1 md:hidden">
          <XIcon />
        </SidebarTrigger>
        <CustomLogo className={"w-[10rem]"} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarProfile
            username={fullName}
            info={"@" + user.username}
            profile={aboutHero}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavSkeleton />}>
              <SidebarMenu className="">
                {links.map((link) => (
                  <SidebarMenuItem
                    key={link.label}
                    className="w-full flex justify-end *:w-[90%]  *:p-3 *:flex *:items-center *:gap-3"
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-red *:text-popover rounded-s-2xl"
                          : ""
                      }
                    >
                      <span className="text-red">{<link.icon />}</span>
                      <span className="text-sm">{link.label}</span>
                      {/* <SidebarMenuButton asChild>
                      </SidebarMenuButton> */}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>

        {state === "user" && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Recent Courses</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 pl-4">
                      <Link to={""} className="flex gap-1 items-center">
                        <Avatar className=" h-7 w-7">
                          <AvatarImage src="https:github.com/shadcn.png" />
                          <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                        <span className="title capitalize">
                          expert course....
                        </span>
                      </Link>
                    </div>
                    <div className="px-5 gap-1 underline-offset-2 text-red flex text-sm underline ">
                      <NavLink to={"/courses/my-courses"}>See all</NavLink>{" "}
                      <ArrowRight className="w-4" />
                    </div>
                  </div>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Extras</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="pl-4 gap-4">
                  <SidebarMenuItem>
                    <NavLink
                      to={"/account/settings"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
                          : ""
                      }
                    >
                      <div className=" flex items-center text-base gap-3">
                        <CogIcon />
                        <span>Settings</span>
                      </div>
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink
                      to={"/help"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
                          : ""
                      }
                    >
                      <div className=" flex items-center text-base gap-3">
                        <HelpCircleIcon />
                        <span>Help</span>
                      </div>
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink
                      to={"/feedback"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
                          : ""
                      }
                    >
                      <div className=" flex items-center text-base gap-3">
                        <MicIcon />
                        <span>Feedback</span>
                      </div>
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink
                      to={"/policy"}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
                          : ""
                      }
                    >
                      <div className=" flex items-center text-base gap-3">
                        <File />
                        <span>Privacy Policy</span>
                      </div>
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    // <div
    //   className={cn(
    //     "fixed bg-background z-40 md:w-20  md:h-screen transition-all",
    //     {
    //       "md:w-60 md:top-0 md:h-screen": navState,
    //       "w-60 top-0 h-screen": mdWidth,
    //       "-translate-x-full": !navState && mdWidth,
    //     }
    //   )}
    // >
    //   {navState && (
    //     <div
    //       className="fixed h-full  left-0 right-0 top-0 -z-10"
    //       onClick={() => setNavState(false)}
    //     ></div>
    //   )}

    //   <ScrollArea
    //     className={cn(" py-2 z-30  flex flex-col gap-3 bg-background", {
    //       "h-screen padding-x": navState || mdWidth,
    //     })}
    //   >
    //     <div className="flex sticky top-0 bg-background py-2">
    //       <Button
    //         className={cn("ml-auto", { hidden: lgWidth && !navState })}
    //         onClick={() => setNavState(false)}
    //       >
    //         <FaTimes />
    //       </Button>
    //     </div>
    //     <div
    //       className={cn("flex flex-col gap-3", {
    //         "gap-6": lgWidth && !navState,
    //       })}
    //     >
    //       {navLinks.map((link) => {
    //         return (
    //           !link.onlyGuest && (
    //             <li
    //               key={link.label}
    //               className={cn(
    //                 "list-none *:flex *:gap-3 *:items-center *:text-xl *:hover:text-red",
    //                 { "*:justify-center": lgWidth && !navState }
    //               )}
    //             >
    //               <NavLink
    //                 to={link.href}
    //                 className={({ isActive, isPending }) =>
    //                   isPending
    //                     ? "pending"
    //                     : isActive
    //                     ? "text-red after:content-[''] after:absolute after:right-3 after:block after:w-1 after:h-8 after:bg-custom-red"
    //                     : ""
    //                 }
    //               >
    //                 <span className={cn({ "text-3xl": lgWidth && !navState })}>
    //                   {<link.icon />}
    //                 </span>
    //                 <span
    //                   className={cn("hidden", { block: navState || mdWidth })}
    //                 >
    //                   {link.label}
    //                 </span>
    //               </NavLink>
    //             </li>
    //           )
    //         );
    //       })}
    //     </div>

    //     <div className={cn("mt-5", { hidden: lgWidth && !navState })}>
    //       <div className="flex flex-col gap-3">
    //         <hr />
    //         <h3>Recent courses</h3>
    //         <div className="flex flex-col gap-3">
    //           <div className="flex flex-col gap-3">
    //             <NavLink to={""} className="flex gap-1 items-center">
    //               <Avatar className=" h-7 w-7">
    //                 <AvatarImage src="https://github.com/shadcn.png" />
    //                 <AvatarFallback>CS</AvatarFallback>
    //               </Avatar>
    //               <span className="title">expert course....</span>
    //             </NavLink>
    //           </div>
    //           <Button>
    //             {" "}
    //             <NavLink to={"/user/username/recent"}>See all</NavLink>
    //           </Button>
    //         </div>
    //         <hr />

    //         {/* <Button>more </Button> */}
    //       </div>

    //       <div className="flex flex-col gap-3 mt-5 pb-5">
    //         <NavLink
    //           to={"/about"}
    //           className={({ isActive, isPending }) =>
    //             isPending
    //               ? "pending"
    //               : isActive
    //               ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
    //               : ""
    //           }
    //         >
    //           <div className=" flex items-center text-base gap-3">
    //             <Users />
    //             <span>About Us</span>
    //           </div>
    //         </NavLink>
    //         <NavLink
    //           to={"/contact"}
    //           className={({ isActive, isPending }) =>
    //             isPending
    //               ? "pending"
    //               : isActive
    //               ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
    //               : ""
    //           }
    //         >
    //           <div className=" flex items-center text-xl gap-3">
    //             <Phone />
    //             <span>Contact Us</span>
    //           </div>
    //         </NavLink>
    //         <NavLink
    //           to={"/help"}
    //           className={({ isActive, isPending }) =>
    //             isPending
    //               ? "pending"
    //               : isActive
    //               ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
    //               : ""
    //           }
    //         >
    //           <div className=" flex items-center text-xl gap-3">
    //             <HelpCircleIcon />
    //             <span>Help</span>
    //           </div>
    //         </NavLink>
    //         <NavLink
    //           to={"/feedback"}
    //           className={({ isActive, isPending }) =>
    //             isPending
    //               ? "pending"
    //               : isActive
    //               ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
    //               : ""
    //           }
    //         >
    //           <div className=" flex items-center text-xl gap-3">
    //             <MicIcon />
    //             <span>Feedback</span>
    //           </div>
    //         </NavLink>
    //         <NavLink
    //           to={"/policy"}
    //           className={({ isActive, isPending }) =>
    //             isPending
    //               ? "pending"
    //               : isActive
    //               ? "relative text-red *:after:content-[''] *:after:absolute *:after:right-0 *:after:block *:after:w-1 *:after:h-7 *:after:bg-custom-red"
    //               : ""
    //           }
    //         >
    //           <div className=" flex items-center text-xl gap-3">
    //             <File />
    //             <span>Privacy Policy</span>
    //           </div>
    //         </NavLink>
    //       </div>
    //     </div>
    //   </ScrollArea>
    // </div>
  );
};

export default AppSidebar;
