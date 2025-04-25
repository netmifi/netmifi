import MyCourseCard from "./MyCourseCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCourseProcessor } from '@/hooks/useCourseProcessor';

const MyCourseCarousel = ({ className, data }: MyCourseCarouselProps) => {
  const trimmedData = data.slice(0, 10);
  const { processCourse, isProcessing, error, processedCourse } = useCourseProcessor();

  const handleProcessCourse = async () => {
    try {
      const course = await processCourse(
        'https://example.com/video.mp4',
        'interactive'
      );
      console.log('Processed course:', course);
    } catch (err) {
      console.error('Failed to process course:', err);
    }
  };

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

      <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-2 w-max">
          {trimmedData.map((datum) => (
            <MyCourseCard key={datum.id} type="on-page" course={datum} className="snap-start" />
          ))}
        </div>
      </div>

      <button onClick={handleProcessCourse} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Process Course'}
      </button>
      {error && <div className="error">{error}</div>}
      {processedCourse && (
        <div>
          <h1>{processedCourse.title}</h1>
          {/* Render course content */}
        </div>
      )}
    </div>
  );
};

export default MyCourseCarousel;
