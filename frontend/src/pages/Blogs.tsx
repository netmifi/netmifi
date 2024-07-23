import { BlogSvg } from "@/assets/svg";
import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import FeaturedBlogs from "@/layouts/blogs/FeaturedBlogs";
import PopularBlogs from "@/layouts/blogs/PopularBlogs";
import RecentBlogs from "@/layouts/blogs/RecentBlogs";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Blogs = () => {
  const rootCourses = ["/blogs/", "/blogs"];
  const { pathname } = useLocation();

  return (
    <>
      {rootCourses.some((route) => pathname === route) ? (
        <main>
          <Jumbotron
            image={BlogSvg}
            className="bg-low-contrast *:text-secondary"
            title="Blogs"
            titleStyle="text-red-foreground"
            body="Exploring ideas, Inspiring minds: Where creativity meets insight.
          A Tapestry of Bloggers Sharing stories, tips ands ideas."
          />
          <RecentBlogs page="child" />
          <PopularBlogs page="child" />

          <Jumbotron
            className="sm:min-h-fit bg-high-contrast"
            image={BlogSvg}
            title="Request to blog on netmifi"
            titleStyle="text-2xl sm:text-[36px] text-secondary"
            body="We give access to aspiring and immediate content writers platform to
            blog on"
            bodyStyle="text-secondary sm:text-lg"
            button={
              <Button
                variant={"secondary"}
                className="mx-auto mt-4 px-10 text-lg"
              >
                <NavLink to="blogs/apply">Request Now</NavLink>
              </Button>
            }
          />

          <FeaturedBlogs page="child" />
          <Newsletter />
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Blogs;
