import CourseCard from "./CourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { tempCourses } from "@/constants/temp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CourseCarouselProps {
  title: string;
  link?: string;
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
        {link && (
          <NavLink to={link}>
            <Button variant="ghost" className="flex items-center gap-2">
              View more
              <AiOutlineArrowRight />
            </Button>
          </NavLink>
        )}
      </div>
      {/* <div className="flex gap-4 overflow-x-auto pb-4"> */}
      <Carousel   opts={{
    align: "start",
    loop: true,
  }} className="relative">
        <CarouselContent className="flex items-stretch ">
          {data.map((course) => (
            <CarouselItem
              key={course.id}
              className="flex w-fit max-w-fit flex-col min-h-[100%] basis-full sm:basis-4/5 md:basis-1/2 lg:basis-1/3"
            >
              {/* make CourseCard grow to fill the item */}
              <CourseCard className="flex-1" course={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-10 shadow-2xl bg-secondary/50 hover:bg-secondary/80 backdrop-blur-[1.1px] size-[3em] [&_svg]:size-6 h-full rounded-none left-0" />
        <CarouselNext className="absolute z-10 shadow-2xl bg-secondary/50 hover:bg-secondary/80 backdrop-blur-[1.1px] size-[3em] [&_svg]:size-6 h-full rounded-none right-0" />
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default CourseCarousel;
