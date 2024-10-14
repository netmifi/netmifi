import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { logoText, logoTextWhite } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ForgotPassword = () => {
  const rootCourses = ["/auth/forgot-password/", "/auth/forgot-password"];
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [via, setVia] = useState<"email" | "sms">("email");

  return (
    <div className="bg-destructive/20 w-screen flex flex-col items-center">
      <img
        src={theme === "dark" ? logoTextWhite : logoText}
        className="w-[7rem] sm:mr-auto sm:mt-10 sm:ml-10 mt-auto"
        alt="logo"
      />

      <Card className="max-sm:mt-auto sm:my-auto max-sm:h-[60vh] md:w-[25em] max-w-full rounded-none sm:rounded-3xl">
        <CardContent className="p-5 sm:p-7 ">
          <CardHeader className="items-start gap-5 p-0 mb-5">
            <Button
              variant={"secondary"}
              className="border border-red bg-destructive/10 py-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon size={20} /> Back
            </Button>
          </CardHeader>
          {rootCourses.some((route) => pathname === route) ? (
            <>
              <div className="flex flex-col gap-4 w-full mb-8">
                <h3 className="text-xl sm:text-2xl font-bold">
                  Forgot Password
                </h3>

                <div
                  className={cn(
                    "bg-secondary border border-secondary rounded-xl flex min-h-20 gap-3 justify-center p-3 cursor-pointer hover:border-red hover:bg-destructive/5",
                    { "bg-destructive/5 border-red": via === "email" }
                  )}
                  onClick={() => setVia("email")}
                >
                  <div className="h-fit my-auto  p-2 rounded-full text-secondary bg-primary/80">
                    <MailIcon className="" />
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-sm sm:text-base font-bold">
                      Reset Via Email
                    </h2>
                    <p className="text-xs sm:text-sm">
                      A One-Time-Password will be sent to your email
                    </p>
                  </div>
                </div>
              </div>
              <CardFooter className="p-0 w-full flex-col gap-3 justify-start">
                <Button asChild className="w-full">
                  <Link to="via-email">Continue</Link>
                </Button>
              </CardFooter>
            </>
          ) : (
            <Outlet />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
