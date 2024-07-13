import { useState } from "react";
import CommentOptions from "./CommentOptions";
import PostAvatar from "../PostAvatar";
import CommentPopover from "./CommentPopover";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Reply = ({ page, postId, commentId, reply }: ReplyProps) => {
  const [isShorten, setIsShorten] = useState<boolean>(reply.reply.length > 299);
  const [currentReply, setCurrentReply] = useState(reply);

  return (
    <div className="flex gap-2 items-start">
      <PostAvatar
        onlyAvatar={true}
        profileName={currentReply.replier.username}
        profileURL={`/user/${currentReply.replier.id}`}
        profileImage={currentReply.replier.profile}
        isVerified={currentReply.replier.isVerified}
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center w-full gap-1">
            <b className="capitalize">{currentReply.replier.username}</b>
            <span className="text-sm">&bull;{currentReply.date}</span>
          </div>

          <CommentPopover isCurrentUser={true} />
        </div>

        <div className="flex flex-col gap-0">
          <div className="flex flex-col items-start">
            <p>
              {currentReply.reply.slice(
                0,
                isShorten ? 300 : currentReply.reply.length
              )}
              {isShorten && "..."}{" "}
            </p>
            {currentReply.reply.length > 299 && (
              <Button
                variant={"transparent"}
                className="p-0 text-blue"
                onClick={() => setIsShorten(!isShorten)}
              >
                {isShorten ? "Show more" : "Show Less"}{" "}
                <ChevronUp className={cn("", { "rotate-180": isShorten })} />
              </Button>
            )}
          </div>

        

          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <CommentOptions
                page={page}
                postId={postId}
                commentId={commentId}
                isLiked={currentReply.isLiked}
                isReply={false}
                replyTo={currentReply.replier.id}
                likes={currentReply.likes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
