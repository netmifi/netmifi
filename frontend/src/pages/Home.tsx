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
      <div className="md:gap-3 gap-2 px-4 md:col-span-9 flex flex-col">
        {isAuth && (
          <section className="md:padding-x py-2 md: flex items-center gap-3">
            <div className="flex gap-2 items-end">
              <h3 className="text-lg md:text-xl font-bold">{greeting}</h3>
              <h4 className="text-base md:text-lg">
                {user.firstName}, {user.lastName}
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
      </div>
      <div className="md:col-span-3 hidden md:block pt-14 space-y-10">
        <section className="h-56 border-2 border-gray-400 rounded-xl py-8 px-8 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <PostAvatar
              isVerified={false}
              profileName={`${user.firstName} ${user.lastName}`}
              profileURL=""
              profileImage={user.profile ?? ""}
              profileImageClassName="md:size-16 text-xl md:text-2xl"
              onlyAvatar
            />

            <div className="flex flex-col gap-px justify-center text-sm">
              <h4 className="text-lg font-bold flex items-center gap-1 ">
                {" "}
                {user.firstName}, {user.lastName}{" "}
                <span className="font-thin text-sm">20h</span>
              </h4>
              <h6>Content Producer . 19k followers</h6>
              <p>
                <b>1047</b> Points Earned
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col text-sm rounded-lg items-center justify-center p-2 border border-red-500">
              <b>10</b>
              <p>Day Streak</p>
            </div>
            <div className="flex flex-col text-sm rounded-lg items-center justify-center p-2 border border-red-500">
              <b>7</b>
              <p>Tasks Completed</p>
            </div>
            <div className="flex flex-col text-sm rounded-lg items-center justify-center p-2 border border-red-500">
              <b>47</b>
              <p>Leaderboard</p>
            </div>
          </div>
        </section>
        <section className="space-y-5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ">
          <h3 className="font-bold">Weekly Streak</h3>
          <hr className=" border-gray-400" />
          <div className="flex justify-between text-xs font-semibold">
            <p>
              <span className="text-red">503</span> Points
            </p>
            <p>
              Get <span className="text-red">x2</span> points by wed 21
            </p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full min-w-10 h-auto bg-white text-black border border-gray-400 rounded-xl flex items-center justify-center"
            classNames={{
              cell:
                "md:w-10 lg:w-12 lg:max-w-[100%] md:max-w-[600px] space-x-2 text-center ",
              head_cell:
                "w-full text-muted-foreground font-semibold tracking-wide",
              day:
                "h-8 w-8 flex items-center justify-center p-0 font-medium hover:bg-red-200 rounded",
              day_selected: "bg-red text-white hover:bg-red",
              day_today: "bg-red -100 text-white font-bold border border-red",
              caption_label: "text-lg font-bold",
            }}
          />
        </section>
        <section className="space-y-5">
          <h3 className="font-bold">Upcoming Test</h3>
          <div className="border border-gray-400 rounded-lg p-4 h-20 flex justify-between items-center">
            <div className="size-14 rounded-md bg-red text-white flex items-center justify-center">
            <FaPersonChalkboard className="size-10"/>
            </div>
            <div className="w-1/2 h-full">
              <h4 className="font-bold">Web Development</h4>
              <div className="flex justify-between text-xs">
                <p>Virtual Test</p>
                <p>23 July, 2025</p>
              </div>
            </div>
            <ChevronRight className="size-9"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
