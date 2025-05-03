import { useState } from "react";
import PostAvatar from "../PostAvatar";
import { Button } from "../ui/button";

interface CommentTemplateProps {
    page: string;
    comment: string;
    date: string;
    user: {
        id: string;
        username: string;
        profile: string;
        isVerified: boolean;
    };
    isReply?: boolean;
}

const CommentTemplate = ({ page, comment, date, user, isReply }: CommentTemplateProps) => {
    const [isShorten, setIsShorten] = useState(true);

    return (
        <div className="flex gap-2 items-start">
            <PostAvatar onlyAvatar={true} profileName={user.username} profileURL={`/user/${user.id}`} profileImage={user.profile} isVerified={user.isVerified} />

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <b className="capitalize">{comment}</b>
                    <span className="text-sm">&bull;{date}</span>
                </div>

                <div className="flex flex-col items-start">
                    <p>{comment.slice(0, isShorten ? 300 : comment.length)}{isShorten && '...'} </p>
                    {comment.length > 299 && <Button variant={"transparent"} className="p-0 text-blue" onClick={() => setIsShorten(!isShorten)}>Show more</Button>}
                </div>
            </div>
        </div>
    );
};

export default CommentTemplate;