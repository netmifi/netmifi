import { buzzCall, greenBgLaptop } from "@/assets/images";
import Jumbotron from "@/components/Jumbotron";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import FeaturedBlogs from "@/layouts/blogs/FeaturedBlogs";
import PopularBlogs from "@/layouts/blogs/PopularBlogs";
import RecentBlogs from "@/layouts/blogs/RecentBlogs";
import { NavLink } from "react-router-dom";

const Blogs = ({ className }: PageProps) => {
  return (
    <main className={className}>
      <Jumbotron
        image={buzzCall}
        className="bg-secondary"
        title="Blogs"
        body="Exploring ideas, Inspiring minds: Where creativity meets insight.
          A Tapestry of Bloggers Sharing stories, tips ands ideas."
      />
      <RecentBlogs page="child" />
      <PopularBlogs page="child" />

      <section className="padding-x padding-y flex flex-wrap w-full bg-[#28cf7fff]">
        <div className="flex flex-col  flex-1 gap-6 p-5">
          <h3 className="font-montserrat text-white text-2xl font-bold mt-auto uppercase">
            Request to blog on netmifi
          </h3>
          <p className="text-muted">
            We give access to aspiring and immediate content writers platform to
            blog on.{" "}
          </p>

          <Button variant={"secondary"} className="mx-auto mt-4 px-10 text-lg">
            <NavLink to="blogs/apply">Request Now</NavLink>
          </Button>
        </div>

        <img src={greenBgLaptop} className="w-[500px]" alt="" />
      </section>

      <FeaturedBlogs page="child" />
      <Newsletter />
    </main>
  );
};

export default Blogs;
