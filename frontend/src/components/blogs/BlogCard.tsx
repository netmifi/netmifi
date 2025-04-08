import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PostAvatar from "../PostAvatar";
import { Eye, MessageCircle, ThumbsUp, Timer } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn, convertToReadableNumber } from "@/lib/utils";

const BlogCard = ({
  className = "",
  id,
  thumbnail,
  title,
  body,
  posterName,
  posterProfileImage,
  posterProfileURL,
  category,
  isVerified,
  isFollowing,
  isLiked,
  likes,
  views,
  comments,
  date,
}: BlogCardProps) => {
  return (
    <Card
      key={id}
      className={
        className +
        " p-1 min-h-full basis-full sm:basis-[45%] sm:max-w-[45%] lg:basis-[30%] lg:max-w-[30%] flex flex-col justify-between"
      }
    >
      <CardHeader className="p-0" data-category={category}>
        <NavLink to={`/blogs/blog/${id}`}>
          <div className="overflow-hidden">
            <img
              src={thumbnail}
              className="h-[250px] w-full object-cover hover:scale-125 transition-transform"
              alt=""
            />
          </div>
        </NavLink>

        <div className="flex justify-between items-center flex-wrap text-xs px-1">
          <small className="flex gap-px">
            <Timer size={14} /> {date}
          </small>
          <div className="flex gap-3 items-center">
            <small className="flex gap-px">
              <ThumbsUp
                className={cn("", { "fill-blue-foreground": isLiked })}
                size={14}
              />{" "}
              {convertToReadableNumber(likes)}
            </small>
            <small className="flex gap-px">
              <Eye size={14} /> {convertToReadableNumber(views)}
            </small>
            <small className="flex gap-px">
              <MessageCircle size={14} />{" "}
              {convertToReadableNumber(comments.count)}
            </small>
          </div>
        </div>

        <NavLink to={`/blogs/${id}`}>
          <CardTitle className="capitalize text-low-contrast text-lg py-2 px-5 font-bold font-montserrat">
            {title.length > 45 ? title.slice(0, 45) + "..." : title}
          </CardTitle>
        </NavLink>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <CardDescription>
          {body.length > 200 ? body.slice(0, 200) + "..." : body}
        </CardDescription>

        <CardFooter className="p-0 mt-auto">
          <PostAvatar
            profileImage={posterProfileImage}
            profileURL={posterProfileURL}
            profileName={posterName}
            isVerified={isVerified}
            description={isFollowing ? "Following" : ""}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
