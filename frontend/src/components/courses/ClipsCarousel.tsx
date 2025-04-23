import { cn } from "@/lib/utils";
import ClipsCard from "./ClipsCard";


const ClipsCarousel = ({ className, data }: ClipsCarouselProps) => {
  const trimmedData = data.slice(0, 6);

  return (
    <div className={cn("flex flex-col gap-5 mx-auto max-w- [90rem]", className)}>
      <div className="flex flex-wrap justify-between w-full px-2">
        <h3 className="text-lg md:text-xl font-bold capitalize">Suggested Clips</h3>
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-3 w-max">
          {trimmedData.map((datum) => (
            <ClipsCard key={datum.id} clip={datum} platform="instagram" className="snap-start" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClipsCarousel;
