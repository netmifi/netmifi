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
  Star,
  Users,
  View,
  ListVideo,
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
import { Course, LearningPattern } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";
import { FaTimeline } from "react-icons/fa6";

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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const totalDuration = course.sections.reduce((acc, section) => {
    return acc + (section.videoTimestamp.end - section.videoTimestamp.start);
  }, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (viewMode === "list") {
    return (
      <Card
        className={cn(
          "flex items-center justify-between p-4 hover:shadow-md transition-shadow",
          className
        )}
      >
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
              {course.type !== "free" && (
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
        "hover:shadow-lg transition-all duration-300",
        "border border-border/50",
        className
      )}
    >
      <div className="p-0 relative mb-auto group">
        <div className="overflow-hidden aspect-video rounded-t-lg">
          <NavLink
            to={
              course.type === "free"
                ? `/courses/learn/${course.slug}/`
                : `/courses/course/${course.slug}/`
            }
          >
            <img
              src={course.thumbnail}
              className="w-full h-full object-cover"
              alt={course.title}
            />
          </NavLink>
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {course.type !== "free" && (
            <Badge
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm px-3 py-1 font-medium"
            >
              ${course.price}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm px-3 py-1 font-medium"
          >
            {formatDuration(totalDuration)}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <PostAvatar
              profileName={course.instructorName}
              Title={
                course.title.length > 40
                  ? course.title.slice(0, 60) + "..."
                  : course.title
              }
              Title={
                course.title.length > 40
                  ? course.title.slice(0, 60) + "..."
                  : course.title
              }
              profileImage={course.instructorProfileImage}
              profileURL={course.instructorProfileURL}
              // description={course.date}
              isVerified={course.isVerified}
            />
          </div>

          {page !== "dashboard" && (
            <div className="flex items-center gap-2 ml-2">
              {course.type !== 'free' ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddToCart(course)}
                      className="rounded-full hover:bg-primary/10"
                    >
                      {mutation.isPending ? (
                        <Loader type="loader" />
                      ) : (
                        <PlusCircle className="w-5 h-5 text-primary" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to cart</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleStartLearning}
                      className="rounded-full hover:bg-primary/10"
                    >
                      <PlayCircle className="w-5 h-5 text-primary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start Learning</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <View className="w-4 h-4 fill- yellow-400 text- yellow-400" />
            <span className="text-muted-foreground/70">{course.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.reviews?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ListVideo className="w-4 h-4" />
            <span>{course.sections?.length}</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {course.learningPatterns?.map((pattern) => (
            <Badge 
              key={pattern} 
              variant="secondary" 
              className="flex items-center gap-1 px-2 py-1 text-xs"
            >
              <LearningPatternIcon type={pattern} />
              {pattern}
            </Badge>
          ))}
        </div>

        {/* <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div className="text-sm">
              <h4 className="font-medium mb-1.5 text-foreground">Course Description</h4>
              <p className="text-muted-foreground line-clamp-3">{course.description}</p>
            </div>
            
            <div className="text-sm">
              <h4 className="font-medium mb-1.5 text-foreground">Learning Objectives</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {course.learningObjectives.slice(0, 3).map((objective, index) => (
                  <li key={index} className="line-clamp-1">{objective}</li>
                ))}
              </ul>
            </div>

            <div className="text-sm">
              <h4 className="font-medium mb-1.5 text-foreground">Requirements</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {course.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="line-clamp-1">{req}</li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible> */}
      </div>
    </Card>
  );
};

export default CourseCard;
