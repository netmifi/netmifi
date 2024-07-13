import { buzzCall, greenBgLaptop } from "@/assets/images"
import Newsletter from "@/components/Newsletter"
import { Button } from "@/components/ui/button"
import FeaturedBlogs from "@/layouts/blogs/FeaturedBlogs"
import PopularBlogs from "@/layouts/blogs/PopularBlogs"
import RecentBlogs from "@/layouts/blogs/RecentBlogs"
import { NavLink } from "react-router-dom"

const Blogs = ({ className }: PageProps) => {
    return (
        <main className={className}>
            <section className="min-h-screen bg-secondary flex flex-wrap items-center max-md:flex-col-reverse gap-0 padding-x padding-y">
                <img src={buzzCall} className="h-[300px] w-[400px] md:w-[600px] md:h-[500px]" alt="" />

                <div className="flex flex-col gap-5">
                    <h1 className="text-7xl font-bold">Blogs</h1>
                    <p className="text-lg font-montserrat">Exploring ideas, Inspiring minds: Where creativity meets insight.
                        <br />
                        A Tapestry of Bloggers Sharing stories, tips ands ideas.
                    </p>
                </div>
            </section>

            <RecentBlogs page="child" />
            <PopularBlogs page="child" />

            <section className="padding-x padding-y flex flex-wrap w-full bg-[#28cf7fff]">
                <div className="flex flex-col  flex-1 gap-6 p-5">
                    <h3 className="font-montserrat text-white text-2xl font-bold mt-auto uppercase">Request to blog on netmifi</h3>
                    <p className="text-muted">We give access to aspiring and immediate content writers platform to blog on. </p>

                    <Button variant={"secondary"} className="mx-auto mt-4 px-10 text-lg"><NavLink to="blogs/apply">Request Now</NavLink></Button>
                </div>

                <img src={greenBgLaptop} className="w-[500px]" alt="" />
            </section>

            <FeaturedBlogs page="child" />
            <Newsletter />
        </main>
    )
}

export default Blogs