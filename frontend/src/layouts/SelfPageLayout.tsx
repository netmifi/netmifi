// This layout handles a section to be transitioned into a full page with all data
import { useState } from "react";
import { Button } from "../components/ui/button";
import Loader from "../components/Loader";
import CourseCard from "../components/courses/CourseCard";
import BlogCard from "../components/blogs/BlogCard";

const SelfPageLayout = ({
  className,
  title,
  data,
  type,
}: SelfPageLayoutProps) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<typeof data>(
    data.slice(0, itemsPerPage)
  );

  const handleLazyLoad = () => {
    // handle lazy loading by cutting down size
    setItemsPerPage(itemsPerPage + 2);
    setIsLoading(true);
    setTimeout(() => {
      setCurrentData(currentData.slice(0, itemsPerPage));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className={className + "  padding-y padding-x"}>
      <h1 className="text-2xl capitalize mb-8 font-bold text-center">
        {title}
      </h1>

      <div>
        <div className="flex flex-wrap gap-5">
          {currentData.map((datum) =>
            type === "course" ? (
              <CourseCard
                date={datum.date}
                id={datum.id}
                instructorName={datum.instructorName}
                instructorProfileImage={datum.instructorProfileImage}
                instructorProfileURL={datum.instructorProfileURL}
                subject={datum.subject}
                thumbnail={datum.thumbnail}
                title={datum.title}
                type={datum.type}
                videoURL={datum.videoURL}
              />
            ) : (
              <BlogCard
                id={datum.id}
                title={datum.title}
                thumbnail={datum.thumbnail}
                body={datum.body}
                category={datum.category}
                comments={datum.comments}
                likes={datum.likes}
                views={datum.views}
                date={datum.date}
                posterName={datum.posterName}
                posterProfileImage={datum.posterProfileImage}
                posterProfileURL={datum.posterProfileURL}
                isVerified={datum.isVerified}
                isFollowing={datum.isFollowing}
                isLiked={datum.isLiked}
              />
            )
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            disabled={isLoading}
            className="rounded-full"
            onClick={handleLazyLoad}
          >
            {isLoading ? <Loader type="all" /> : "Load more"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SelfPageLayout;
