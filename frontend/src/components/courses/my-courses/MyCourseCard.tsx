import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  ListPlusIcon,
  Share2Icon,
  Star,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import CreateListDialog from "./CreateListDialog";
import { FaPlayCircle } from "react-icons/fa";

const MyCourseCard = ({ className, type, course }: MyCourseCardProps) => {
  const collections = [
    "content creation",
    "writing",
    "watched",
    "extra courses",
    "content production",
    "content writing",
    "email courses",
  ];

  return (
    <Card
      key={course.id}
      className={cn(
        "min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col gap-7",
        className
      )}
    >
      <CardHeader className="p-0 relative mb-auto">
        <div className="overflow-hidden">
          <NavLink to={`/courses/my-courses/${course.id}/`}>
            <img
              src={course.thumbnail}
              className="h-[190px] w-full object-cover hover:scale-125 transition-transform"
              alt=""
            />
            <FaPlayCircle className="size-10 absolute top-[30%] left-[40%] opacity-80 fill-popover " />
          </NavLink>
        </div>

        <NavLink to={`course/${course.id}/`}>
          <CardTitle className="capitalize text-low-contrast text-base font-bold font-montserrat px-5">
            {course.title.length > 45
              ? course.title.slice(0, 45) + "..."
              : course.title}
          </CardTitle>
        </NavLink>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 mt-auto">
        <div className="flex justify-between">
          <PostAvatar
            isVerified={course.isVerified}
            profileName={course.instructorName}
            profileURL={course.instructorProfileURL}
            profileImage={course.instructorProfileImage}
          />

          {type === "self-page" && (
            <Popover>
              <PopoverTrigger>
                <EllipsisVertical />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col p-0 min-w-fit overflow-hidden ">
                <div className="flex flex-col p-3">
                  <h4 className="font-montserrat font-semibold text-sm">
                    Collections
                  </h4>

                  {collections.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <h6 className="font-montserrat text-sm mb-1">
                        Click to add to list
                      </h6>
                      <ScrollArea className="h-24 px-2">
                        <div className="flex flex-wrap gap-2">
                          {collections.map((collection) => (
                            <Button
                              variant={"transparent"}
                              className={cn(
                                "p-2 text-[12px] capitalize border-2 border-primary rounded-full hover:bg-primary hover:text-primary-foreground",
                                {
                                  "bg-red text-primary-foreground border-red hover:border-primary":
                                    course.collection?.length &&
                                    course.collection?.find(
                                      (item) => item === collection
                                    ),
                                }
                              )}
                            >
                              {collection}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  ) : (
                    <p className="text-xs mt-4">You have no collection</p>
                  )}
                </div>
                <hr />

                <div className="*:flex *:gap-3 *:justify-start">
                  <Button
                    variant={"transparent"}
                    className="hover:bg-primary hover:text-primary-foreground rounded-none w-full"
                  >
                    <Share2Icon />
                    Share
                  </Button>
                  <CreateListDialog
                    triggerChild={
                      <Button
                        variant={"transparent"}
                        className="hover:bg-primary hover:text-primary-foreground rounded-none w-full"
                      >
                        <ListPlusIcon />
                        Create list
                      </Button>
                    }
                    courseId={course.id}
                  />
                  <Button
                    variant={"transparent"}
                    className="hover:bg-primary hover:text-primary-foreground rounded-none w-full"
                  >
                    <Star
                      className={cn("", {
                        "fill-yellow-500": course.isFavorite,
                      })}
                    />
                    Favorite
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex flex-col">
          <Progress value={course.progress} className="h-0.5" />

          <span className="text-xs">{course.progress}% Completed</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCourseCard;
