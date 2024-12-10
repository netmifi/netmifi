import { useApp } from "@/app/app-provider";
import { HomeSvg } from "@/assets/svg";
import CourseCarousel from "@/components/courses/CourseCarousel";
import MyCourseCarousel from "@/components/courses/my-courses/MyCourseCarousel";
import InstructorCard from "@/components/instructors/InstructorCard";
import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import {
  tempPurchasedCourses as purchasedCourses,
  tempInstructors as instructors,
  tempCourses as courses,
} from "@/constants/temp";
import RecentCourses from "@/layouts/courses/RecentCourses";
import TopCourses from "@/layouts/courses/TopCourses";
import { cn, convertToReadableNumber } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// import CountUp from "react-countup";

const Home = () => {
  const { isAuth } = useApp();
  const greetingPhrases = [
    "Ahoy There",
    "Hi There",
    "Hello There",
    "Good to See You",
    "Welcome Back",
  ];

  const greeting =
    greetingPhrases[Math.round(Math.random() * (greetingPhrases.length - 1))];

  const exploreSectionRef = useRef<HTMLElement>(null);
  const handleHandleExplore = () => {
    exploreSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [isCountEnded, setIsCountEnded] = useState(false);
  const netmifiNumbers = [
    {
      count: 152020,
      label: "students",
    },
    {
      count: 28020,
      label: "online courses",
    },
    {
      count: 6820,
      label: "certified",
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      {isAuth && (
        <section className="padding-x padding-y flex items-center gap-3">
          <PostAvatar
            isVerified={false}
            profileName="Metane Ekeh"
            profileURL=""
            profileImage=""
            profileImageClassName="size-20 text-2xl"
            onlyAvatar
          />

          <div className="flex flex-col gap-px justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold">{greeting},</h2>
            <p>FirstName, LastName</p>
          </div>
        </section>
      )}

      <Jumbotron
        className="bg-secondary"
        image={HomeSvg}
        title="Unlock the creator in you"
        titleClassName="sm:text-5xl"
        body="Learn. Create. Share"
        button={
          <div className="flex flex-col gap-4">
            <Button
              className="rounded-full text-lg mr-auto"
              onClick={handleHandleExplore}
            >
              Explore <ArrowDownIcon />
            </Button>

            <div className="flex gap-3">
              {netmifiNumbers.map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <h4 className="w-full  text-center font-bold text-xl pb-px border-b-2 border-b-gray-500">
                    {/* <CountUp
                      enableScrollSpy
                      duration={5}
                      scrollSpyDelay={2}
                      end={item.count}
                      start={0}
                      startOnMount
                      scrollSpyOnce
                      onEnd={() => {
                        setIsCountEnded(true);
                        console.log("ended");
                      }}
                      className={cn({ hidden: isCountEnded })}
                    /> */}

                    {isCountEnded && (
                      <>{convertToReadableNumber(item.count) + "+"}</>
                    )}
                  </h4>
                  <p className="font-montserrat">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section
        className="padding-x padding-y flex flex-col gap-16"
        ref={exploreSectionRef}
      >
        {isAuth && (
          <div>
            <MyCourseCarousel data={purchasedCourses} />
          </div>
        )}

        <TopCourses page="child" />
        <RecentCourses page="child" />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Who you will learn from</h3>
            <p className="font-montserrat">
              We have a community of elite and experienced instructors that
              would make you excel in your chosen career path.
            </p>
          </div>

          <div className="flex flex-wrap justify-around gap-6">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
          <Button asChild className="mx-auto mt-5 rounded-full">
            <NavLink to="/instructors">See more</NavLink>
          </Button>
        </div>

        {isAuth && <CourseCarousel title="top picks for you" data={courses} />}

        {isAuth && (
          <div className="flex flex-col gap-7">
            <CourseCarousel title="quick and easy" data={courses} />
          </div>
        )}
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;
