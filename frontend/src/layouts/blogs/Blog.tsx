import PostAvatar from "@/components/PostAvatar";
import { Button } from "@/components/ui/button";
import { tempBlogs } from "@/constants/temp";
import { cn, convertToReadableNumber } from "@/lib/utils";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaFlag, FaShareNodes } from "react-icons/fa6";
import { Navigate, useLocation } from "react-router-dom";
import RecommendedReads from "./RecommendedReads";
import Comment from "@/components/comment/Comment";
import CommentBox from "@/components/comment/CommentBox";

const Blog = () => {
  const id = useLocation().pathname.split("/").pop();
  const [blog, setBlog] = useState<Blog | undefined>(
    tempBlogs.find((item) => item.id === id)
  );

  // const pathname =
  // make a get request for the post

  const handleFollow = (isFollowing: boolean) => {
    const updatedBlog: Blog = { ...blog, isFollowing: !isFollowing };
    setBlog(updatedBlog);
  };

  const handleLike = (isLiked: boolean) => {
    const newLikedCount = !isLiked ? blog?.likes + 1 : blog?.likes - 1;
    const updatedBlog: Blog = {
      ...blog,
      isLiked: !isLiked,
      likes: newLikedCount,
    };
    setBlog(updatedBlog);
  };

  return (
    <main className="padding-y">
      {blog ? (
        <div className="flex flex-col px-4 sm:px-8 md:px-28">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <PostAvatar
                profileName={blog.posterName}
                profileURL={blog.posterProfileURL}
                profileImage={blog.posterProfileImage}
                description={blog.date}
                isVerified={blog.isVerified}
              />

              <Button onClick={() => handleFollow(blog.isFollowing)}>
                {blog.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>

            <Button variant={"transparent"}>
              <FaSave size={20} />
            </Button>
          </div>

          <img
            src={blog.thumbnail}
            className="h-[425px] sm:h-[500px] object-cover sm:object-contain mx-auto mt-6"
            alt=""
          />

          <div className="flex justify-between gap-5">
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Button
                  variant={"transparent"}
                  className="p-0"
                  onClick={() => handleLike(blog.isLiked)}
                >
                  <ThumbsUp
                    className={cn("", {
                      "text-low-contrast fill-blue-foreground": blog.isLiked,
                    })}
                  />
                </Button>
                {convertToReadableNumber(blog.likes)}
              </div>

              <div className="flex items-center gap-1">
                <Eye className="text-low-contrast" />
                {convertToReadableNumber(blog.views)}
              </div>

              <div className="flex items-center gap-1">
                <MessageCircle className="text-low-contrast" />
                {convertToReadableNumber(blog.comments.count)}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant={"transparent"} className="p-0">
                <FaShareNodes size={20} />
              </Button>
              <Button variant={"transparent"} className="p-0">
                <FaFlag size={20} />
              </Button>
            </div>
          </div>
          <hr className="mb-5 mt-3" />

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl">{blog.title}</h2>

            <div className="first-letter:font-bold first-letter:text-2xl">
              {blog.body}
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-28">
            <RecommendedReads />

            <div className="flex flex-col gap-5">
              <CommentBox postId={blog.id} state="comment" page="blog" />

              <div className="flex flex-col">
                <h2 className="text-xl">
                  {" "}
                  {blog.comments.comments?.length} Comment
                  {blog.comments.comments?.length !== 1 && "s"}
                </h2>

                <div className="flex flex-col gap-7 mt-4">
                  {blog.comments.comments?.map((comment) => (
                    <Comment postId={blog.id} page="blog" comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/404" />
      )}
    </main>
  );
};

export default Blog;
