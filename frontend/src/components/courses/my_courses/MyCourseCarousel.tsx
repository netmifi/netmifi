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
    <div className={cn("flex flex-col gap-5 ", className)}>
      <div className="flex flex-wrap justify-between w-full px-2">
        <h3 className="text-lg sm:text-xl font-bold capitalize">
          Purchased Courses
        </h3>

        <Button
          variant={"transparent"}
          size={'sm'}
          className="max-sm:text-xs border border-red text-red hover:bg-red hover:text-popover rounded-full *:flex *:items-center"
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
                className="basis-[60%] md:basis-[30%] lg:basis-[35%] *:md:max-w-full *:lg:max-w-full *:mx-auto"
              >
                <MyCourseCard course={datum} type="on-page" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-0 md:border-0 md:rounded-none md:h-full md:w-16 sm:bg- secondary md:bg-gradient-to-r from-gray-200 via-gray-200/80 to-transparent rounded-r-full" />
          <CarouselNext className="right-0 md:border-0 md:rounded-none md:h-full md:w-16 sm:bg- secondary md:bg-gradient-to-l from-gray-200 via-gray-200/80 to-transparent rounded-l-full" />
        </Carousel>
      </div>
    </div>
  );
};

export default MyCourseCarousel;
