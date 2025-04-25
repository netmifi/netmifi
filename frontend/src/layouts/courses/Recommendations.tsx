import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { courseSubjects } from "@/constants";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEllipsis } from "react-icons/fa6";
import CourseCard from "@/components/courses/CourseCard";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineWarning } from "react-icons/ai";
import { useState } from "react";
import { tempCourses } from "@/constants/temp";

const Recommendations = () => {
  const [data, setData] = useState<Course[]>([
    ...tempCourses,
  ]);
  const [currentSubject, setCurrentSubject] = useState<string>("for you");
  const [courseType, setCourseType] = useState<"all" | "paid" | "free">("paid");

  const filterCourse = (type: string, subject: string) => {
    if (type !== "all" && subject !== "for you") {
      setData(
        tempCourses.filter(
          (course) =>
            course.type === type &&
            course.category.toLowerCase() === subject.toLowerCase()
        )
      );
    } else if (type === "all" && subject !== "for you") {
      setData(
        tempCourses.filter(
          (course) => course.category.toLowerCase() === subject.toLowerCase()
        )
      );
    } else if (type !== "all" && subject === "for you") {
      setData(tempCourses.filter((course) => course.type === type));
    } else {
      setData(tempCourses);
    }
  };

  const handleCourseType = (type: "all" | "paid" | "free") => {
    setCourseType(type);
    filterCourse(type, currentSubject);
  };

  const handleCurrentSubject = (subject: string) => {
    setCurrentSubject(subject);
    filterCourse(courseType, subject);
  };

  return (
    <div className="flex flex-col gap-16 ">
      <div className="flex justify-between">
        <h3 className="text-2xl font-montserrat font-bold">
          Recommended for you
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <FaEllipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-[100px] gap-2 *:bg-custom-red *:hover:text-secondary">
            <Button
              disabled={courseType === "all"}
              onClick={() => handleCourseType("all")}
            >
              All
            </Button>
            <Button
              disabled={courseType === "paid"}
              onClick={() => handleCourseType("paid")}
            >
              Paid
            </Button>
            <Button
              disabled={courseType === "free"}
              onClick={() => handleCourseType("free")}
            >
              Free
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <Carousel>
        <CarouselContent>
          <CarouselItem
            className={"basis-3/12 sm:basis-[20%] md:basis-[11%] min-w-fit"}
          >
            <Button
              onClick={() => handleCurrentSubject("for you")}
              disabled={currentSubject === "for you"}
              className={cn(
                "bg-transparent border-2 border-red text-red font-montserrat hover:bg-red hover:text-secondary w-full rounded-full",
                { "bg-red text-secondary": currentSubject === "for you" }
              )}
            >
              For you
            </Button>
          </CarouselItem>

          {courseSubjects.map((subject) => (
            <CarouselItem
              key={subject.label}
              className="basis-3/12 sm:basis-[20%] md:basis-[11%] min-w-fit "
            >
              <Button
                key={subject.label}
                onClick={() => handleCurrentSubject(subject.label)}
                disabled={currentSubject === subject.label}
                className={cn(
                  "bg-transparent border-2 border-red text-red font-montserrat hover:bg-red hover:text-secondary capitalize w-full rounded-full",
                  { "bg-red text-secondary": currentSubject === subject.label }
                )}
              >
                {subject.label}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-wrap gap-5 max-md:justify-center">
        {data.length > 0 ? (
          data.map((datum) => <CourseCard key={datum.id} course={datum} />)
        ) : (
          <div className="text-lg w-full flex flex-col items-center">
            <AiOutlineWarning className="text-6xl" />
            <h2>No Course Found</h2>
          </div>
        )}
      </div>

      <NavLink
        state={{ course: currentSubject, courseType }}
        to={`/courses/${currentSubject}`}
      >
        <Button className="mx-auto mt-5 flex items-center">
          {" "}
          <span>Load more</span> <AiOutlineArrowRight />
        </Button>
      </NavLink>
    </div>
  );
};

export default Recommendations;
