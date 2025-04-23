import { instructorDashboardLinks, navLinks } from "@/constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  CogIcon,
  File,
  HelpCircleIcon,
  MicIcon,
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
  SidebarMenuItem,
  SidebarMenuSkeleton,
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
    <Sidebar  className="flex-shrink-0 w-52 transition-all duration-300 ease-in-out">
      <SidebarHeader className="p-5 flex items-center relative">
        <SidebarTrigger className="absolute top-0 right-1 md:hidden">
          <XIcon />
        </SidebarTrigger>
        <CustomLogo className={"w-[7rem]"} />
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
                    className="w-full flex justify-end *:w-[100%]  *:p-2 *:flex *:items-center *:gap-3"
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-red *:text-popover p-3 rounded-s-2xl"
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
    </Sidebar>
  );
};

export default AppSidebar;
