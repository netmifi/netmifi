import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MyCourseCard from "./MyCourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MyCourseCarousel = ({ className, data }: MyCourseCarouselProps) => {
  const trimmedData = data.slice(0, 10);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-wrap justify-between w-full">
        <h3 className="text-lg sm:text-xl font-bold capitalize">
          Purchased Courses
        </h3>

        <Button
          variant={"transparent"}
          className="max-sm:text-xs border border-red text-red hover:bg-red hover:text-popover rounded-2xl *:flex *:items-center"
          asChild
        >
          <NavLink to={"/courses/my-courses"} className="flex gap-2">
            <span>My courses</span> <AiOutlineArrowRight />
          </NavLink>
        </Button>
      </div>

      <div className="flex justify-center items-center">
        <Carousel
          opts={{ align: "center" }}
          className="w-full flex justify-center"
        >
          <CarouselContent>
            {trimmedData.map((datum) => (
              <CarouselItem
                key={datum.id}
                className="md:basis-1/2 lg:basis-1/3 *:md:max-w-full *:lg:max-w-full *:mx-auto"
              >
                <MyCourseCard course={datum} type="on-page" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-0 bg-secondary" />
          <CarouselNext className="right-0 bg-secondary" />
        </Carousel>
      </div>
    </div>
  );
};

export default MyCourseCarousel;
