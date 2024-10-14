import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { logoText, logoTextWhite } from "@/assets/logo";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const rootCourses = ["/auth/welcome/", "/auth/welcome"];
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <img
        src={theme === "dark" ? logoTextWhite : logoText}
        className="w-[7rem] mt-8"
        alt="logo"
      />
      <Card className="w-full min-w-full md:min-w-[70%] md:w-[70%]">
        <CardContent className="px-1">
          <CardHeader className="items-start">
            <Button
              variant={"secondary"}
              className="border border-red bg-destructive/10 py-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon size={20} /> Back
            </Button>
          </CardHeader>

          <CardFooter>
            {rootCourses.some((route) => pathname === route) ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-lg sm:text-xl">
                    Hi, Onyekachi
                  </h2>
                  <p className="text-sm sm:text-base">
                    Get started on <b>Netmifi</b>. Tell us what you want to use
                    our platform for and we would tailour it to suit you.
                  </p>
                </div>

                <div className="flex flex-wrap gap-8 *:flex-grow *:md:basis-[48%]">
                  <Link
                    to="interest"
                    className="flex flex-col gap-5 shadow-md p-5 rounded-xl"
                  >
                    <div className="flex justify-between gap-5 items-center">
                      <b className="text-red">E-learning</b>
                      <div className="bg-secondary p-2 rounded-full text-xs sm:text-sm">
                        Try now
                      </div>
                    </div>

                    <p className="text-sm sm:text-base">
                      To enroll and buy courses that can help me to improve my
                      skills and unleash my creativity!
                    </p>
                  </Link>
                  <Link
                    to="/auth/become-instructor"
                    className="flex flex-col gap-5 shadow-md p-5 rounded-xl"
                  >
                    <div className="flex justify-between gap-5 items-center">
                      <b className="text-red">Become an instructor</b>
                      <div className="bg-secondary p-2 rounded-full text-xs sm:text-sm">
                        Try now
                      </div>
                    </div>

                    <p className="text-sm sm:text-base">
                      Share your expertise with the world! As an instructor,
                      create engaging courses and content that educate learners.
                    </p>
                  </Link>

                  <div className="flex flex-col gap-5 shadow-md p-5 rounded-xl bg-destructive/10">
                    <div className="flex justify-between gap-5 items-center">
                      <b className="text-red">Social Commerce</b>
                      <div className="bg-red text-secondary p-2 rounded-full text-xs sm:text-sm">
                        Coming soon
                      </div>
                    </div>

                    <p className="text-sm sm:text-base">
                      Create a store, sell products, manage every aspect of your
                      sales and get paid globally.{" "}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 shadow-md p-5 rounded-xl bg-destructive/10">
                    <div className="flex justify-between gap-5 items-center">
                      <b className="text-red">Content Production</b>
                      <div className="bg-red text-secondary p-2 rounded-full text-xs sm:text-sm">
                        Coming soon
                      </div>
                    </div>

                    <p className="text-sm sm:text-base">
                      Purchase customized content production plans tailored for
                      your content.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
