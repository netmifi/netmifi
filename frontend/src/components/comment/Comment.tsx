import { conversation1 } from "@/assets/images";
import PostAvatar from "../PostAvatar";
import { Button } from "../ui/button";
import { useState } from "react";
import CommentPopover from "./CommentPopover";
import { ChevronUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentOptions from "./CommentOptions";

const Comment = ({ page, postId, comment }: CommentProps) => {
  const [isShorten, setIsShorten] = useState<boolean>(comment.comment.length > 299);
  const [currentComment, setCurrentComment] = useState(comment);
  const [isRepliesOpen, setisRepliesOpen] = useState(false);


  return (
    <div className="flex gap-2 items-start">
      <PostAvatar onlyAvatar={true} profileName={currentComment.commenter.username} profileURL={`/user/${currentComment.commenter.id}`} profileImage={conversation1} isVerified={currentComment.commenter.isVerified} />

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
            <p>{currentComment.comment.slice(0, isShorten ? 300 : currentComment.comment.length)}{isShorten && '...'} </p>
            {currentComment.comment.length > 299 && <Button variant={"transparent"} className="p-0 text-blue" onClick={() => setIsShorten(!isShorten)}>{isShorten ? 'Show more' : 'Show Less'} <ChevronUp className={cn('', { 'rotate-180': isShorten })} /></Button>}
          </div>

          <div className="flex gap-2">
            <CommentOptions page={page} postId={postId} commentId={currentComment.id} isLiked={currentComment.isLiked} isReply={false} replyTo={currentComment.commenter.id} likes={currentComment.likes} />
            {currentComment.replies && <Button variant={"transparent"}>Replies({currentComment.replies.count})</Button>}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment