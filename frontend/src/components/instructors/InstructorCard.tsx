import {
  cn,
  convertToReadableNumber,
  getFirstLettersForProfile,
} from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "react-rating";
import { BookOpen, Star } from "lucide-react";
import { FaCertificate, FaUserGraduate } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const InstructorCard = ({ className, instructor }: InstructorCardProps) => {
  const instructorUrl = "/instructors/instructor/" + instructor.id;
  const footerTooltips = [
    {
      label: "courses",
      icon: BookOpen,
      count: instructor.courses,
    },
    {
      label: "certificates",
      icon: FaCertificate,
      count: instructor.certificates,
    },
    {
      label: "students",
      icon: FaUserGraduate,
      count: instructor.students,
    },
  ];
  return (
    <Card
      key={instructor.id}
      className={cn(
        "p-0 overflow-hidden min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col gap-7",
        className
      )}
    >
      <CardContent className="p-0 hover-item relative">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="size-40 text-xl sm:text-2xl uppercase">
            <AvatarImage src={instructor.profile ?? ""} />
            <AvatarFallback className="size-36">
              {getFirstLettersForProfile(instructor.name)}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="capitalize font-normal">
            {instructor.name}
          </CardTitle>

          <CardDescription className="text-red first-letter:uppercase">
            {instructor.area}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-2 flex justify-end items-baseline gap-px">
          <span className="text-sm font-montserrat font-semibold">
            {instructor.averageRating}
          </span>
          <Rating
            start={0}
            stop={5}
            fractions={2}
            initialRating={instructor.averageRating}
            emptySymbol={<Star size={14} />}
            fullSymbol={<Star size={14} className="fill-yellow-500" />}
            readonly={true}
          />
        </CardFooter>

        <div className="flex flex-col justify-evenly hover-item-container">
          <div className="flex gap-3">
            {footerTooltips.map((item) => (
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <span>
                      <item.icon size={20} />
                    </span>
                    <span className="">
                      {convertToReadableNumber(item.count)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="capitalize">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
            ))}
          </div>

          <Button className="mx-auto" asChild>
            <NavLink to={instructorUrl}>View profile</NavLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
