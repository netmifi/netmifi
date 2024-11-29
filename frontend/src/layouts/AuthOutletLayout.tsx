import { logo, logoText, logoTextWhite } from "@/assets/logo";
import { GetStartedSvg } from "@/assets/svg";
import { useTheme } from "@/app/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthOutletLayout = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  const exemptionRoute = [
    "forgot-password",
    "email-verification",
    "otp-verification",
    "welcome",
  ];

  const checkExemptionRoute = () => {
    return exemptionRoute.some((route) => pathname.includes(route));
  };

  console.log(checkExemptionRoute());

  const checkPathRootPath = (): boolean => {
    if (pathname === "/auth" || pathname === "/auth/") return true;
    else return false;
  };

  return (
    <>
      <main className="flex min-h-screen bg-background">
        {!checkExemptionRoute() ? (
          <>
            <div className="flex-grow padding-x padding-y">
              {checkPathRootPath() ? (
                <section className="w-full flex flex-col gap-7 justify-center items-center h-full">
                  <div className="max-lg:w-full">
                    <h1 className="text-2xl text-red text-left ">
                      Get Started on Netmifi
                    </h1>
                  </div>
                  <img
                    src={GetStartedSvg}
                    className="w-[20rem] drop-shadow-lg"
                    alt="get started"
                  />

                  <div className="flex flex-col gap-2 lg:items-center">
                    <h3 className="text-base sm:text-lg font-bold">
                      Unlock a World of Limitless Possibilities
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-primary/70">
                      Create an account to learn, sell, connect with creators
                      and explore communities who share your interests.
                    </p>
                  </div>

                  <div className="flex  flex-wrap *:shadow-lg *:flex-1 gap-5 *:text-lg *:px-20 *:py-6 max-md:w-full">
                    <Button asChild variant={"secondary"}>
                      <Link to="sign-in">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="sign-up">Create account</Link>
                    </Button>
                  </div>
                </section>
              ) : (
                <section className="flex flex-col gap-5">
                  <img
                    src={theme === "dark" ? logoTextWhite : logoText}
                    className="w-[15rem]"
                    alt="logo"
                  />
                  <Outlet />
                </section>
              )}
            </div>

            <aside className="bg-destructive/20 max-xl:hidden basis-[40%] padding-x flex flex-col min-h-screen">
              <div className="flex flex-col mt-auto">
                <img
                  src={checkPathRootPath() ? logo : GetStartedSvg}
                  className={cn("mt-auto w-full h-[30rem]", {
                    "opacity-10": checkPathRootPath(),
                  })}
                  alt=""
                />
                {!checkPathRootPath() && (
                  <div className="flex flex-col gap-2 lg:items-center">
                    <h3 className="text-3xl font-bold">
                      Unlock a World of Limitless Possibilities
                    </h3>
                    <p className="text-xl text-primary/70">
                      Create an account to{" "}
                      <span className="font-semibold capitalize text-primary">
                        {" "}
                        learn, sell, connect with creators{" "}
                      </span>
                      and{" "}
                      <span className="font-semibold text-primary">
                        Explore
                      </span>{" "}
                      communities who share your interests.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-8 mt-auto mb-5">
                <Link
                  className="text-primary/90 hover:text-primary/80"
                  to={"https://facebook.com/"}
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  className="text-primary/90 hover:text-primary/80"
                  to={"https://instagram.com/"}
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  className="text-primary/90 hover:text-primary/80"
                  to={"https://x.com/"}
                >
                  <FaXTwitter size={20} />
                </Link>
                <Link
                  className="text-primary/90 hover:text-primary/80"
                  to={"https://linkedin.com/"}
                >
                  <FaLinkedinIn size={20} />
                </Link>
              </div>
            </aside>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default AuthOutletLayout;
