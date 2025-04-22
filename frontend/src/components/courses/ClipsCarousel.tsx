import { cn } from "@/lib/utils";
import ClipsCard from "./my_courses/ClipsCard";

const ClipsCarousel = ({ className, data }: ClipsCarouselProps) => {
  const trimmedData = data.slice(0, 6);

  return (
    <div className={cn("flex flex-col gap-5 mx-auto max-w-7xl", className)}>
      <div className="flex flex-wrap justify-between w-full px-2">
        <h3 className="text-lg sm:text-xl font-bold capitalize">Clips</h3>
      </div>

      <div className="flex justify-center items-center ">
        <div className="w-full flex justify-center gap-2 overflow-x-scroll scrollbar-hide">
          {trimmedData.map((datum) => (
              <ClipsCard key={datum.id} clip={datum}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClipsCarousel;
