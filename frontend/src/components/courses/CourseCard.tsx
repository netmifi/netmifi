import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import PostAvatar from "../PostAvatar";
import {
  PlusCircle,
  Video,
  Headphones,
  BookOpen,
  Gamepad2,
  PlayCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useApp } from "@/app/app-provider";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import Loader from "../Loader";
import { useAddToCart } from "@/api/hooks/cart/useAddToCart";
import { Badge } from "../ui/badge";

interface CoursesCardProps {
  className?: string;
  course: Course;
  page?: "user" | "dashboard";
  viewMode?: "card" | "list";
  learningPatterns?: LearningPattern[];
}

const LearningPatternIcon = ({ type }: { type: LearningPattern }) => {
  const icons = {
    video: <Video className="w-4 h-4" />,
    audio: <Headphones className="w-4 h-4" />,
    written: <BookOpen className="w-4 h-4" />,
    gamification: <Gamepad2 className="w-4 h-4" />,
  };
  return icons[type];
};

const CourseCard = ({
  className = "",
  course,
  page = "user",
  viewMode = "card",
  learningPatterns = [],
}: CoursesCardProps) => {
  const { cartItems } = useApp();
  const mutation = useAddToCart();
  const navigate = useNavigate();

  const handleAddToCart = async (course: Course) => {
    try {
      if (cartItems && cartItems.find((item) => item.id === course.id))
        return toast.error(`${course.title} already in cart`);

      await mutation.mutateAsync(course);
      toast.success(`${course.title} has been added to your cart`);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  const handleStartLearning = () => {
    if (course.type === "free") {
      navigate(`/courses/learn/${course.slug}`);
    } else {
      navigate(`/courses/course/${course.slug}`);
    }
  };

  if (viewMode === "list") {
    return (
      <Card className={cn("flex items-center justify-between p-4", className)}>
        <div className="flex items-center gap-4">
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
          <div className="flex gap-2">
            {learningPatterns.map((pattern) => (
              <Badge
                key={pattern}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <LearningPatternIcon type={pattern} />
                {pattern}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {page !== "dashboard" && (
            <>
              {course.type !== "paid" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="transparent"
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="transparent"
                    onClick={handleStartLearning}
                    className="p-0 [&_svg]:size-6"
                  >
                    <PlayCircle className="text-primary-foreground drop-shadow-md" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start Learning</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card
      key={course.id}
      className={cn(
        "flex flex-col w-full max-w-[400px] min-w-[280px] gap-3",
        className
      )}
    >
      <div className="p-0 relative mb-auto">
        <div className="overflow-hidden aspect-video">
          <NavLink
            to={
              course.type === "free"
                ? `/courses/learn/${course.slug}/`
                : `/courses/course/${course.slug}/`
            }
          >
            <img
              src={course.thumbnail}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              alt={course.title}
            />
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2 flex-1 min-w-0">
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
            <div className="flex items-center gap-2 ml-2">
              {/* {course.type !== "free" && ( */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="transparent"
                      onClick={() => handleAddToCart(course)}
                      className="p-0 [&_svg]:size-6"
                    >
                      {mutation.isPending ? (
                        <Loader type="loader" />
                      ) : (
                        <PlusCircle className="fill-sidebar-primary-foreground/80 text-primary-foreground drop-shadow-md" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to cart</TooltipContent>
                </Tooltip>
              {/* )} */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="transparent"
                    onClick={handleStartLearning}
                    className="p-0 [&_svg]:size-6"
                  >
                    <PlayCircle className="text-primary-foreground drop-shadow-md" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start Learning</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {learningPatterns.map((pattern) => (
            <Badge
              key={pattern}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <LearningPatternIcon type={pattern} />
              {pattern}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
