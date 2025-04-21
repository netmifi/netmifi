import { useApp } from "@/app/app-provider";
// import { motion, AnimatePresence } from "framer-motion";
// import { HomeSvg } from "@/assets/svg";
import RobotSVG from "@/assets/svg/robot-holding-coins.svg";
import CourseCarousel from "@/components/courses/CourseCarousel";
import MyCourseCarousel from "@/components/courses/my_courses/MyCourseCarousel";
import InstructorCard from "@/components/instructors/InstructorCard";
// import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
import PostAvatar from "@/components/PostAvatar";
// import Robotron from "@/components/Robotron";
import { Button } from "@/components/ui/button";
import {
  tempPurchasedCourses as purchasedCourses,
  tempInstructors as instructors,
  tempCourses as courses,
} from "@/constants/temp";
import RecentCourses from "@/layouts/courses/RecentCourses";
import TopCourses from "@/layouts/courses/TopCourses";
// import { ArrowDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AdCarousel from "@/components/ui/AdCarousel";
import { Calendar } from "@/components/ui/calendar";
import { ChevronRight } from "lucide-react";
import { FaPersonChalkboard } from "react-icons/fa6";
import AnalyticsSidebar from "@/components/UserActivityPanel";
import UserActivityPanel from "@/components/UserActivityPanel";
// import CountUp from "react-countup";

const Home = () => {
  const { isAuth, user } = useApp();
  const greetingPhrases = [
    "Hi",
    "Hi There",
    "Hey",
    "Hello There",
    "Good to See You",
    "Great to See You",
    "Welcome Back",
  ];

  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const rand = Math.floor(Math.random() * greetingPhrases.length);
    setGreeting(greetingPhrases[rand]);
  }, []);

  const exploreSectionRef = useRef<HTMLElement>(null);
  // const handleHandleExplore = () => {
  //   exploreSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // const [isCountEnded, setIsCountEnded] = useState(false);

  //  TODO: MAKE A SWING COUNTER
  // const netmifiNumbers = [
  //   {
  //     count: 152020,
  //     label: "students",
  //   },
  //   {
  //     count: 28020,
  //     label: "online courses",
  //   },
  //   {
  //     count: 6820,
  //     label: "certified",
  //   },
  // ];

  const ads = [
    {
      image: RobotSVG,
      title: "Elevate Your Skills to Transform Your Career",
      subtitle: "Enjoy 30% discount on your first purchase.",
    },
    {
      image: RobotSVG,
      title: "Unlock Exclusive Content with One Click",
      subtitle: "Your tech journey starts with this offer.",
    },
  ];

  return (
    <div className="md:grid md:grid-cols-12 flex flex-col">
      <main className="md:gap-3 gap-2 px-4 md:col-span-9 flex flex-col">
        {isAuth && (
          <section className="md:padding-x py-2 md: flex items-center gap-3">
            <div className="flex gap-2 items-end">
              <h3 className="text-lg md:text-xl font-bold">{greeting}</h3>
              <h4 className="text-base md:text-lg">
                {user?.firstName}, {user?.lastName}
              </h4>
            </div>
          </section>
        )}

        <section className=" relative">
          <AdCarousel ads={ads} />
        </section>

        <section
          className=" flex flex-col gap-6 md:gap-16"
          ref={exploreSectionRef}
        >
          {isAuth && (
            <div className="">
              <MyCourseCarousel data={purchasedCourses} />
            </div>
          )}

          <TopCourses page="child" />
          <RecentCourses page="child" />

          <div className="flex flex-col gap-7 ">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Who you will learn from</h3>
              <p className="font-montserrat text-xs md:text-sm">
                We have a community of elite and experienced instructors that
                would make you excel in your chosen career path.
              </p>
            </div>

            <div className="grid md:flex md:flex-wrap grid-cols-2 md:justify-around gap-2">
              {instructors.slice(0, 4).map((instructor) => (
                <InstructorCard
                  className="md:min-h-40 col-span- full"
                  key={instructor.id}
                  instructor={instructor}
                />
              ))}
            </div>
            <Button asChild className="mx-auto mt-  rounded-full">
              <NavLink to="/instructors">See more</NavLink>
            </Button>
          </div>

          {isAuth && (
            <CourseCarousel title="top picks for you" data={courses} />
          )}

          {isAuth && (
            <div className="flex flex-col gap-7">
              <CourseCarousel title="quick and easy" data={courses} />
            </div>
          )}
          <Newsletter />
        </section>
      </main>

      <aside className="hidden md:block col-span-3">
        <UserActivityPanel user={user} date={date} setDate={setDate} />
      </aside>
    </div>
  );
};

export default Home;
