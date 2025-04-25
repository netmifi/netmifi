import PostAvatar from "../PostAvatar";
import { Button } from "../ui/button";
import { useState } from "react";
import CommentPopover from "./CommentPopover";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentOptions from "./CommentOptions";
import { ScrollArea } from "../ui/scroll-area";
import Reply from "./Reply";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  id: string;
  comment: string;
  isLiked?: boolean;
  commenter: {
    id: string;
    username: string;
    profile: string;
    isVerified?: boolean;
  };
  likes?: number;
  date: string;
  replies?: {
    count: number;
    replies: Array<{
      id: string;
      reply: string;
      commentId: string;
      isLiked?: boolean;
      likes?: number;
      date: string;
      replier: {
        id: string;
        username: string;
        profile: string;
        isVerified?: boolean;
      };
      replyTo?: {
        id: string;
        username: string;
        profile: string;
      };
    }>;
  };
}

const Comment = ({
  comment,
  isLiked = false,
  commenter,
  likes = 0,
  date,
  replies = { count: 0, replies: [] }
}: CommentProps) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes);
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    setIsLikedState(!isLikedState);
    setLikesCount(isLikedState ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={commenter?.profile} alt={commenter?.username} />
          <AvatarFallback>{commenter?.username?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{commenter?.username || 'Anonymous'}</span>
            {commenter?.isVerified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : 'Recently'}
            </span>
          </div>
          <p className="mt-1 text-sm">{comment || 'No comment content'}</p>
          <div className="mt-2 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isLikedState ? 'text-primary' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likesCount}</span>
            </Button>
            {replies?.count > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowReplies(!showReplies)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{replies.count} {replies.count === 1 ? 'reply' : 'replies'}</span>
              </Button>
            )}
          </div>
        </div>
          </div>

      {showReplies && replies?.replies && replies.replies.length > 0 && (
        <div className="ml-14 space-y-4">
          {replies.replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={reply.replier?.profile} alt={reply.replier?.username} />
                <AvatarFallback>{reply.replier?.username?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reply.replier?.username || 'Anonymous'}</span>
                  {reply.replier?.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {reply.date ? formatDistanceToNow(new Date(reply.date), { addSuffix: true }) : 'Recently'}
                  </span>
                </div>
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">
                    Replying to {reply.replyTo?.username || 'Anonymous'}
                  </span>
                  <br />
                  {reply.reply || 'No reply content'}
                </p>
                <div className="mt-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${reply.isLiked ? 'text-primary' : ''}`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{reply.likes || 0}</span>
                </Button>
            </div>
              </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
