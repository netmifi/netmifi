import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const CourseCarousel = ({ title, link, data }: CourseCarouselProps) => {
  const trimmedData = data.slice(0, 10);

  return (
    <div className=" flex flex-col gap-5">
      <h3 className="max-sm: px-2 text-lg md:text-xl font-bold capitalize">{title}</h3>

      <div className="flex justify-center items-center">
        <Carousel
          opts={{ align: "center" }}
          className="w-full flex justify-center"
        >
          <CarouselContent>
            {trimmedData.map((datum) => (
              <CarouselItem
                key={datum.id}
                className="basis-[70%] md:basis-[30%] lg:basis-[35%] *:md:max-w-full *:lg:max-w-full *:mx-auto"
              >
                <CourseCard course={datum} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-0 md:border-0 md:rounded-none md:h-full md:w-16 sm:bg- secondary md:bg-gradient-to-r from-gray-200 via-gray-200/80 to-transparent rounded-r-full" />
          <CarouselNext className="right-0 md:border-0 md:rounded-none md:h-full md:w-16 sm:bg- secondary md:bg-gradient-to-l from-gray-200 via-gray-200/80 to-transparent rounded-l-full" />
        </Carousel>
      </div>
      {link && (
        <Button size={'sm'} className="mx-auto mt- 5 rounded-full *:flex *:items-center">
          <NavLink to={link}>
            <span>View more</span> <AiOutlineArrowRight />
          </NavLink>
        </Button>
      )}
    </div>
  );
};

export default CourseCarousel;
