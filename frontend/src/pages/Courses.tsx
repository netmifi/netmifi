import { CoursesSvg } from "@/assets/svg";
import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecentCourses from "@/layouts/courses/RecentCourses";
import Recommendations from "@/layouts/courses/Recommendations";
import TopCourses from "@/layouts/courses/TopCourses";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import { FaCircle, FaSearch } from "react-icons/fa";

const Courses = ({ className }: PageProps) => {
  const [search, setSearch] = useState<string>("");
  const exploreSectionRef = useRef<HTMLElement>(null);
  const handleHandleExplore = () => {
    exploreSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className={className}>
      <Jumbotron
        className="bg-secondary text-black"
        title={"courses"}
        image={CoursesSvg}
        body="Unleash your inner craftsman, dive into our enriching courses. Because your journey to crafts mastery starts here."
        bodyStyle=""
        button={
          <Button
            onClick={handleHandleExplore}
            className="rounded-full hover:bg-secondary hover:text-red flex items-center px-7"
          >
            {" "}
            Explore
            <ArrowDown />
          </Button>
        }
      />
      {/* <Jumbotron title={'courses'} exploreSectionRef={exploreSectionRef} thumbnail={AboutUsSvg} /> */}

      <section
        ref={exploreSectionRef}
        className="flex flex-col gap-7 padding-x py-24"
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-xl text-low-contrast font-bold font-montserrat text-center">
            Pick over 50+ online video course with new addition published every
            month.
          </h2>
          <div className="flex  justify-center items-center">
            <Input
              className=" w-2/5 p-6 rounded-e-none focus-visible:outline-none text-lg font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search favorite course here"
            />
            <Button className="p-6  rounded-s-none">
              <FaSearch />
            </Button>
          </div>
        </div>
        <hr />

        <div className="flex flex-col gap-20 w-full">
          <h2 className="text-red sm:text-3xl text-2xl text-center mb-7">
            Explore Our Diverse Learning Landscape{" "}
          </h2>

          <TopCourses page="child" />
          <RecentCourses page="child" />
          <Recommendations />
        </div>
      </section>

      <section className="flex flex-wrap gap-5 justify-between items-center padding-x py-24 bg-blue">
        <div className="sm:basis-[40%] flex items-center justify-center">
          <img src={CoursesSvg} className="size-3/4" alt="" />
        </div>

        <div className="flex flex-col justify-between gap-5 sm:basis-[55%]">
          <h2 className="text-secondary sm:text-3xl text-xl">
            How to Become a Successful{" "}
            <span className=" text-destructive"> Content Creator</span>
          </h2>

          <ul className="flex flex-col gap-3 text-sm sm:text-lg *:flex *:gap-2 *:items-center text-gray-300">
            <li>
              <FaCircle className="fill-destructive" />{" "}
              <span>Discover the latest trends about your content</span>
            </li>
            <li>
              <FaCircle className="fill-destructive" />{" "}
              <span>Understand what content creation is all about</span>
            </li>
            <li>
              <FaCircle className="fill-destructive" />{" "}
              <span>
                To go viral, your content has to be QUICK, ENTERTAINING, and
                INFORMATIVE
              </span>
            </li>
          </ul>

          <Button className="mx-auto px-16">Download PDF</Button>
        </div>
      </section>

      <Newsletter />
    </main>
  );
};

export default Courses;
