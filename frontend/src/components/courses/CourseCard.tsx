import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { FaNairaSign } from "react-icons/fa6";
import PostAvatar from "../PostAvatar";
import { PlusCircle, Star, Unlock } from "lucide-react";
import Rating from "react-rating";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const CourseCard = ({ className = "", course }: CoursesCardProps) => {
  const handleAddToCart = () => {
    alert("Please add add to cart feature");
  };

  return (
    <Card
      key={course.id}
      className={cn(
        "min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col",
        className
      )}
    >
      <CardHeader className="p-0 relative mb-auto">
        <div className="overflow-hidden">
          <NavLink to={`/courses/course/${course.id}/`}>
            <img
              src={course.thumbnail}
              className="h-[250px] w-full object-cover hover:scale-125 transition-transform"
              alt=""
            />
          </NavLink>
        </div>

        <div className="flex flex-col">
          <NavLink to={`/courses/course/${course.id}/`}>
            <CardTitle className="capitalize text-low-contrast text-base font-bold font-montserrat px-5">
              {course.title.length > 45
                ? course.title.slice(0, 45) + "..."
                : course.title}
            </CardTitle>
          </NavLink>
          <CardDescription className="text-xs px-5 py-2 capitalize bg-secondary">
            {course.subject}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs">{course.rating}</span>
            <Rating
              start={0}
              stop={5}
              fractions={2}
              initialRating={course.rating}
              emptySymbol={<Star size={16} />}
              fullSymbol={<Star size={16} className="fill-yellow-500" />}
              readonly={true}
            />
            <div className="flex items-center"></div>
          </div>

          {course.price && (
            <p className="flex items-center text-sm">
              <FaNairaSign size={12} /> {course.price?.toLocaleString()}
            </p>
          )}
        </div>

        <CardFooter className="flex justify-between mt-auto">
          <div className="flex items-center gap-2">
            <PostAvatar
              profileName={course.instructorName}
              profileImage={course.instructorProfileImage}
              profileURL={course.instructorProfileURL}
              description={course.date}
              isVerified={course.isVerified}
            />
          </div>

          {course.type === "paid" ? (
            <Button
              variant={"transparent"}
              className="p-0"
              onClick={handleAddToCart}
            >
              <PlusCircle className="fill-red text-primary-foreground drop-shadow-md" />
            </Button>
          ) : (
            <Unlock className="text-red" />
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
