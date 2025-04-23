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
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import Loader from "../Loader";
import { useAddToCart } from "@/api/hooks/cart/useAddToCart";

const CourseCard = ({
  className = "",
  course,
  page = "user",
}: CoursesCardProps) => {
  const { cartItems } = useApp();
  const mutation = useAddToCart();

  const handleAddToCart = async (course: Course) => {
    console.log(course, cartItems);

    try {
      // this function handles cart addition
      console.log(course);
      if (cartItems && cartItems.find((item) => item.id === course.id))
        return toast.error(`${course.title} already in cart`); // is item already in cart

      const { data } = await mutation.mutateAsync(course);
      // setCartItems([...cartItems, course]); // update cart
      console.log(data);
      toast.success(`${course.title} has been added to your cart`);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <Card
      key={course.id}
      className={cn("min-h-full md:min-w-[500px] min-w-[250px] gap-3 flex flex-col", className)}
    >
      <div className="p-0 relative mb-auto">
        <div className="overflow-hidden">
          <NavLink to={`/courses/course/${course.id}/`}>
            <img
              src={course.thumbnail}
              className="h-[200px] md:h-[320px] w-full object-cover hover:scale-125 transition-transform"
              alt=""
            />
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between px-0 mt-auto">
          <div className="flex items-center gap-2 px-2">
            <PostAvatar
              profileName={course.instructorName}
              Title={
                course.title.length > 40
                  ? course.title.slice(0, 60) + "..."
                  : course.title
              }
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
                  onClick={() => handleAddToCart(course)}
                  className="p-0 [&_svg]:size-6"
                >
                  {mutation.isPending ? (
                    <Loader type="loader" />
                  ) : (
                    <PlusCircle className="fill-red text-primary-foreground drop-shadow-md" />
                  )}
                </Button>
              </TooltipTrigger>

              <TooltipContent>Add to cart</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
