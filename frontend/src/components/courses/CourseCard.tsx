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
import { PlusCircle, Star } from "lucide-react";
import Rating from "react-rating";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/app/app-provider";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CourseCard = ({
  className = "",
  course,
  page = "user",
}: CoursesCardProps) => {
  const { cartItems, setCartItems, handleAddToCart} = useApp();



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
            <CardTitle className="capitalize text-low-contrast text-base font-bold px-5 py-1 min-h-[4em]">
              {course.title.length > 40
                ? course.title.slice(0, 60) + "..."
                : course.title}
            </CardTitle>
          </NavLink>
          {page !== "dashboard" && (
            <CardDescription className="text-xs px-5 py-2 capitalize bg-secondary">
              {course.subject}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-1">
            {/* <span className="font-bold text-xs">{course.rating}</span> */}
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

          <p className="flex items-center text-xs sm:text-sm text-red">
            {course.price || course.price !== 0 ? (
              <>
                <FaNairaSign size={12} /> {course.price?.toLocaleString()}
              </>
            ) : (
              "Free"
            )}
          </p>
        </div>

        <CardFooter className="flex justify-between px-0 mt-auto">
          <div className="flex items-center gap-2">
            <PostAvatar
              profileName={course.instructorName}
              profileImage={course.instructorProfileImage}
              profileURL={course.instructorProfileURL}
              description={course.date}
              isVerified={course.isVerified}
            />
          </div>

          {page !== "dashboard" && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"transparent"}
                  onClick={()=> handleAddToCart(course)}
                  className="p-0 [&_svg]:size-6"
                >
                  <PlusCircle className="fill-red text-primary-foreground drop-shadow-md" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Add to cart</TooltipContent>
            </Tooltip>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
