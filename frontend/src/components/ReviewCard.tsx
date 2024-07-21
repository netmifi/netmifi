import PostAvatar from "@/components/PostAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Rating } from "@smastrom/react-rating";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Ellipsis, Flag } from "lucide-react";
import { Button } from "./ui/button";

const ReviewCard = ({
  className,
  name,
  profile,
  isVerified,
  profileUrl,
  review,
  rating,
}: ReviewCardProps) => {
  const fixedRating = Math.floor(rating);
  return (
    <Card
      className={cn("min-h-fit hover:bg-secondary transition-all", className)}
    >
      <CardContent className="p-5 flex flex-col gap-4 h-full justify-between">
        <CardHeader className="p-0 flex flex-col">
          <div className="flex justify-between">
            <PostAvatar
              isVerified={isVerified}
              profileName={name}
              profileURL={profileUrl}
              profileImage={profile}
            />

            <Popover>
              <PopoverTrigger>
                <Ellipsis />
              </PopoverTrigger>

              <PopoverContent className="w-fit p-0">
                <Button variant={"transparent"} className="hover:bg-primary hover:text-secondary">
                  <Flag /> Report
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <CardDescription>{review}</CardDescription>
        </CardHeader>

        <CardFooter className="">
          <Rating
            value={fixedRating}
            halfFillMode="svg"
            className="w-20 h-6 py-0 ml-auto"
            readOnly
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
