import { aboutHero } from "@/assets/images";
import CourseCarousel from "@/components/courses/CourseCarousel";
import MyCourseCarousel from "@/components/courses/my-courses/MyCourseCarousel";
import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import { tempPurchasedCourses as purchasedCourses, tempCourses as courses} from "@/constants/temp";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <main className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-3xl sm:text-4xl">My profile</h2>
        <p className="text-sm sm:text-base">
          Hi Victony Darey, it’s good to have you here, we are committed to
          impacting and monitoring your progress.
        </p>
      </div>

      <div className="relative w-full">
        <div className="relative">
          <div className="bg-primary/80 h-full w-full absolute rounded-2xl"></div>
          <img
            src={aboutHero}
            alt=""
            className="rounded-2xl h-[20rem] w-full opacity-75"
          />
        </div>

        <div className="absolute top-[83%] left-[4%]">
          <PostAvatar
            profileName="victory darey"
            isVerified={true}
            profileImage={aboutHero}
            profileImageClassName={"size-24 drop-shadow-md"}
            profileURL=""
            onlyAvatar={true}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-16">
        <div className="flex justify-between">
          <h2 className="font-semibold text-3xl sm:text-4xl capitalize">
            victony darey
          </h2>

          <Button
            asChild
            variant={"transparent"}
            className="text-red border border-red rounded-2xl hover:bg-red hover:text-popover"
          >
            <Link to="/account/settings" className="flex gap-2">
              <EditIcon /> Edit profile
            </Link>
          </Button>
        </div>
        <p className="text-sm sm:text-base">
          Hi Victony Darey, it’s good to have you here, we are committed to
          impacting and monitoring your progress.
        </p>
          </div>
          
          <MyCourseCarousel 
          data={purchasedCourses}
          />

<br />
          <hr />
<br />
          <CourseCarousel 
              data={courses}
              title="Courses to look out for"
          />
    </main>
  );
};

export default Profile;
