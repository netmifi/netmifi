import { useApp } from "@/app/app-provider";
// import { motion, AnimatePresence } from "framer-motion";
// import { HomeSvg } from "@/assets/svg";
import NetmifiMascot from "@/assets/images/netmifi-mascot.png";
import CourseCarousel from "@/components/courses/CourseCarousel";
// import MyCourseCarousel from "@/components/courses/my_courses/MyCourseCarousel";
import InstructorCard from "@/components/instructors/InstructorCard";
// import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
// import PostAvatar from "@/components/PostAvatar";
// import Robotron from "@/components/Robotron";
import { Button } from "@/components/ui/button";
import {
  tempInstructors as instructors,
  tempClips as clips,
  tempCourses as courses,
} from "@/constants/temp";
import RecentCourses from "@/layouts/courses/RecentCourses";
import TopCourses from "@/layouts/courses/TopCourses";
// import { ArrowDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// import { Calendar } from "@/components/ui/calendar";
// import { ChevronRight } from "lucide-react";
// import { FaPersonChalkboard } from "react-icons/fa6";
// import AnalyticsSidebar from "@/components/UserActivityPanel";
// import UserActivityPanel from "@/components/UserActivityPanel";
import ClipsCarousel from "@/components/courses/ClipsCarousel";
import { getCoursesByUserNiches, getQuickAndEasyCourses } from "@/lib/utils";
import { AdCarousel } from "@/components/AdCarousel";
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
  const quickCourses = getQuickAndEasyCourses(clips);
  const interests = Array.isArray(user?.interests) ? user?.interests : [];
  const nicheCourses = getCoursesByUserNiches(courses, interests);

  const [greeting, setGreeting] = useState("");
  // const [date, setDate] = useState<Date | undefined>(new Date());

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
      image: NetmifiMascot,
      title: "Learn at Your Own Pace",
      subtitle:
        "Access high-quality courses anytime, anywhere. Start your learning journey today!",
    },
    {
      image: NetmifiMascot,
      title: "Interactive Learning Experience",
      subtitle:
        "Engage with dynamic content, quizzes, and hands-on projects to master new skills.",
    },
    {
      image: NetmifiMascot,
      title: "Track Your Progress",
      subtitle:
        "Monitor your learning journey with detailed progress tracking and achievements.",
    },
    {
      image: NetmifiMascot,
      title: "Join Our Learning Community",
      subtitle:
        "Connect with fellow learners, share insights, and grow together.",
    },
  ];

  return (
    <div className="flex">
      <main className="md:gap-3 max-w-full gap-2 px-2 md:px-4 flex flex-col">
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
          <TopCourses page="child" />

          {/* TODO uncomment this line when clips feature is ready */}
          <div>
            <ClipsCarousel data={clips} />
          </div>

          <RecentCourses page="child" />

          <div className="flex flex-col gap-7 md:hidden ">
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
            <CourseCarousel title="top picks for you" data={nicheCourses} />
          )}

          {isAuth && (
            <div className="flex flex-col gap-7">
              <CourseCarousel title="quick and easy" data={courses} />
            </div>
          )}
          <Newsletter />
        </section>
      </main>

      {/* <aside className="hidden md:block">
        <UserActivityPanel user={user} date={date} setDate={setDate} />
      </aside> */}
    </div>
  );
};

export default Home;
