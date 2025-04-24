import CourseCard from "./CourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const CourseCarousel = ({ title, link, data }: CourseCarouselProps) => {
  const trimmedData = data.slice(0, 10);

  return (
    <div className=" flex flex-col gap-5">
      <h3 className="max-sm: px-2 text-lg md:text-xl font-bold capitalize">
        {title}
      </h3>

      <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-2 w-max">
          {trimmedData.map((datum) => (
            <CourseCard key={datum.id} course={datum} className="snap-start" />
          ))}
        </div>
      </div>

      {link && (
        <Button
          size={"sm"}
          className="mx-auto mt- 5 rounded-full *:flex *:items-center"
        >
          <NavLink to={link}>
            <span>View more</span> <AiOutlineArrowRight />
          </NavLink>
        </Button>
      )}
    </div>
  );
};

export default CourseCarousel;
