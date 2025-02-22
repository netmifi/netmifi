import { useApp } from "@/app/app-provider";
import { aboutHero } from "@/assets/images";
import CourseCarousel from "@/components/courses/CourseCarousel";
import MyCourseCarousel from "@/components/courses/my-courses/MyCourseCarousel";
import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import {
  tempPurchasedCourses as purchasedCourses,
  tempCourses as courses,
} from "@/constants/temp";
import { convertToReadableNumber } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useApp();

  const fullName = user.firstName + " " + user.lastName;
  return (
    <main>
      {/* <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold text-3xl sm:text-4xl">My profile</h2>
        <p className="text-sm sm:text-base">
          Hi <strong className="capitalize">{fullName}</strong>, it’s good to
          have you here, we are committed to impacting and monitoring your
          progress.
        </p>
      </div> */}

      <div className="relative w-full">
        <div className="relative">
          <div className="bg-foreground/70 h-full w-full absolute"></div>
          <img
            src={aboutHero}
            alt=""
            className="h-[15rem] sm:h-[20rem] w-full"
          />
        </div>

        <div className="absolute left-[4%] top-[70%] sm:top-[83%] ">
          <PostAvatar
            profileName={fullName}
            isVerified={true}
            profileImage={aboutHero}
            profileImageClassName={"size-20 sm:size-24 drop-shadow-md"}
            profileURL=""
            onlyAvatar={true}
          />
        </div>

        <div className="flex gap-px absolute bottom-[10%] right-0">
          <Button
            variant={"outline"}
            size={"icon"}
            className="opacity-90 size-fit p-1 bg-background hover:bg-foreground hover:text-background rounded-full [&_svg]:size-4 sm:[&_svg]:size-5 text-xs sm:text-sm"
          >
            <Link to={"https://www.tinyurl.com"}>
              <FaFacebookF />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="opacity-90 size-fit p-1 bg-background hover:bg-foreground hover:text-background rounded-full [&_svg]:size-4 sm:[&_svg]:size-5 text-xs sm:text-sm"
          >
            <Link to={"https://www.tinyurl.com"}>
              <FaTiktok />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="opacity-90 size-fit p-1 bg-background hover:bg-foreground hover:text-background rounded-full [&_svg]:size-4 sm:[&_svg]:size-5 text-xs sm:text-sm"
          >
            <Link to={"https://www.tinyurl.com"}>
              <FaInstagram />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="opacity-90 size-fit p-1 bg-background hover:bg-foreground hover:text-background rounded-full [&_svg]:size-4 sm:[&_svg]:size-5 text-xs sm:text-sm"
          >
            <Link to={"https://www.tinyurl.com"}>
              <FaYoutube />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="opacity-90 size-fit p-1 bg-background hover:bg-foreground hover:text-background rounded-full [&_svg]:size-4 sm:[&_svg]:size-5 text-xs sm:text-sm"
          >
            <Link to={"https://www.tinyurl.com"}>
              <FaGlobe />
            </Link>
          </Button>
        </div>

        <div className="text-right max-sm:text-sm flex items-end justify-end gap-2 w-full">
          {convertToReadableNumber(77000)} Followers
        </div>
      </div>

      <section className="px-2 sm:px-4 mt-8 sm:mt-16">
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl capitalize">
              {fullName}
            </h2>

            <Button
              asChild
              variant={"transparent"}
              className="text-red border border-red rounded-2xl hover:bg-red hover:text-popover"
            >
              <Link
                to="/account/settings"
                className="flex gap-2 max-sm:text-xs"
              >
                <EditIcon /> Edit profile
              </Link>
            </Button>
          </div>
          <p className="text-sm sm:text-base">
            {user.about ||
              "Nothing about you, update your profile for more personalization"}
          </p>
        </div>

        <MyCourseCarousel data={purchasedCourses} />

        <br />
        <hr />
        <br />
        <CourseCarousel data={courses} title="Courses to look out for" />
      </section>
    </main>
  );
};

export default Profile;
