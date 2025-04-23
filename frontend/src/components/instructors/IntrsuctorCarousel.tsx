import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InstructorCard from "./InstructorCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const InstructorCarousel = ({ title, link, data }: InstructorCarouselProps) => {
  const trimmedData = data.slice(0, 10);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-montserrat font-bold capitalize">{title}</h3>

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
                <InstructorCard key={datum.id} instructor={datum} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
      {link && (
        <Button className="mx-auto mt-5 rounded-full *:flex *:items-center">
          <NavLink to={link}>
            <span>See more</span> <AiOutlineArrowRight />
          </NavLink>
        </Button>
      )}
    </div>
  );
};

export default InstructorCarousel;
