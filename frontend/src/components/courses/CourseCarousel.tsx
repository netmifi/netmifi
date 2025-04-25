import CourseCard from "./CourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Course } from "@/types";
import { tempCourses } from "@/constants/temp";

interface CourseCarouselProps {
  title: string;
  link: string;
  data?: Course[];
  className?: string;
}

const CourseCarousel = ({
  title,
  link,
  data = tempCourses,
  className = "",
}: CourseCarouselProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <NavLink to={link}>
          <Button variant="ghost" className="flex items-center gap-2">
            View more
            <AiOutlineArrowRight />
          </Button>
        </NavLink>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;
