import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentBox from "./CommentBox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CommentOptions = ({
  page,
  isLiked,
  likes,
  postId,
  replyTo,
  commentId,
  isReply,
}: CommentOptionsProps) => {
  const [isCommentLiked, setIsCommentLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes);

  const [isReplying, setIsReplying] = useState(false);

  const handleLike = () => {
    console.log(commentId);
    isCommentLiked
      ? setLikesCount(likesCount - 1)
      : setLikesCount(likesCount + 1);
    setIsCommentLiked(!isCommentLiked);
  };
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant={"transparent"}
            className="p-0"
            onClick={() => handleLike()}
          >
            <ThumbsUp
              className={cn({
                "text-low-contrast fill-blue-foreground": isCommentLiked,
              })}
            />
          </Button>
          {likesCount}
        </div>

        <Popover>
          <PopoverTrigger className="text-blue">Reply</PopoverTrigger>
          <PopoverContent className="sm:min-w-[400px]" align="start">
            <CommentBox
              page={page}
              postId={postId}
              commentId={commentId}
              replyTo={replyTo}
              state={isReply ? "reply" : "comment"}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* {isReplying &&
            } */}
    </div>
  );
};

export default CommentOptions;
