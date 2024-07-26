import PostAvatar from "../PostAvatar";
import { Button } from "../ui/button";
import { useState } from "react";
import CommentPopover from "./CommentPopover";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentOptions from "./CommentOptions";
import { ScrollArea } from "../ui/scroll-area";
import Reply from "./Reply";

const Comment = ({ page, postId, comment }: CommentProps) => {
  const [isShorten, setIsShorten] = useState<boolean>(
    comment.comment.length > 299
  );
  const [currentComment, setCurrentComment] = useState(comment);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  return (
    <div key={comment.id} className="flex gap-2 items-start">
      <PostAvatar
        onlyAvatar={true}
        profileName={currentComment.commenter.username}
        profileURL={`/user/${currentComment.commenter.id}`}
        profileImage={currentComment.commenter.profile}
        isVerified={currentComment.commenter.isVerified}
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center w-full gap-1">
            <b className="capitalize">{currentComment.commenter.username}</b>
            <span className="text-sm">&bull;{currentComment.date}</span>
          </div>

          <CommentPopover isCurrentUser={true} />
        </div>

        <div className="flex flex-col gap-0">
          <div className="flex flex-col items-start">
            <p>
              {currentComment.comment.slice(
                0,
                isShorten ? 300 : currentComment.comment.length
              )}
              {isShorten && "..."}{" "}
            </p>
            {currentComment.comment.length > 299 && (
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

          <div className="flex flex-col gap-0">
            <div className="flex gap-2">
              <CommentOptions
                page={page}
                postId={postId}
                commentId={currentComment.id}
                isLiked={currentComment.isLiked}
                isReply={false}
                replyTo={currentComment.commenter.id}
                likes={currentComment.likes}
              />
              {currentComment.replies && (
                <Button
                  variant={"transparent"}
                  onClick={() => setIsRepliesOpen(!isRepliesOpen)}
                >
                  Replies({currentComment.replies.count})
                  <ChevronUp
                    className={cn("", { "rotate-180": isRepliesOpen })}
                  />
                </Button>
              )}
            </div>

            <ScrollArea
              className={cn("h-[200px] transition-all ", {
                "h-0": !isRepliesOpen,
              })}
            >
              <div className="flex flex-col gap-5 py-6 sm:pr-4 border-l-2 border-secondary *:before:content *:before:bg-secondary *:before:w-2 *:sm:before:w-20 *:before:h-[1.2px] *:before:relative *:before:my-auto">
                {comment?.replies?.replies.map((reply) => (
                  <Reply
                    key={reply.id}
                    page="blog"
                    postId={postId}
                    commentId={currentComment.id}
                    reply={reply}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
