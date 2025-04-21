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
      count: instructor.courses || 0,
    },
    {
      label: "certificates",
      icon: FaCertificate,
      count: instructor.certificates || 0,
    },
    {
      label: "students",
      icon: FaUserGraduate,
      count: instructor.students  || 0,
    },
  ];

  const instructorName = instructor.name || instructor.firstName + " " + instructor.lastName;
  return (
    <Card
      key={instructor.id}
      className={cn(
        "p-0 overflow-hidden min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col md:gap-7",
        className
      )}
    >
      <CardContent className="p-0 hover-item relative">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="size-40 text-xl sm:text-2xl uppercase">
            <AvatarImage src={instructor.profile ?? ""} />
            <AvatarFallback className="size-36">
              {getFirstLettersForProfile(instructorName)}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="capitalize md:font-normal font-bold text-lg md:text-2xl">
            {instructorName}
          </CardTitle>

          <CardDescription className="text-red text-xs md:text-sm first-letter:uppercase">
            {instructor.area || instructor.niche}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-2 xl:flex justify-end hidden items-baseline gap-px">
          <span className="text-sm font-montserrat font-semibold">
            {instructor.averageRating || 0}
          </span>
          <Rating
            start={0}
            stop={5}
            fractions={2}
            initialRating={instructor.averageRating || 0}
            emptySymbol={<Star size={14} />}
            fullSymbol={<Star size={14} className="fill-yellow-500" />}
            readonly={true}
          />
        </CardFooter>

        <div className="flex flex-col justify-evenly hover-item-container">
          <div className="flex gap-2 md:gap-3 text-xs md:text-sm">
            {footerTooltips.map((item) => (
                <Tooltip>
                  <TooltipTrigger className="flex p-0 items-center gap-1">
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

          <Button size={'sm'} className="mx-auto text-xs md:text-sm" asChild>
            <NavLink to={instructorUrl}>View profile</NavLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
