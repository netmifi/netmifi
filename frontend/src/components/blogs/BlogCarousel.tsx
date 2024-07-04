import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BlogCard from "./BlogCard";
import { NavLink } from "react-router-dom";

const BlogCarousel = ({ title, link='', data }: BlogCarouselProps) => {
    const trimmedData = data.slice(0, 10);

    return (
        <div className="flex flex-col gap-6">

            <div className="flex justify-between">
                <h3 className="text-2xl font-montserrat font-bold capitalize">{title}</h3>
                {link && <NavLink to={link} className='text-red underline underline-offset-2 text-lg'> See all</NavLink>}
            </div>

            <div className="flex justify-center items-center">
                <Carousel opts={{ align: 'center' }} className="w-full flex justify-center"
                >
                    <CarouselContent>
                        {trimmedData.map((datum) => (
                            <CarouselItem key={datum.id} className="md:basis-1/2 lg:basis-1/3 *:md:max-w-full *:lg:max-w-full *:mx-auto">
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
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" left-0 top-[40%]" />
                    <CarouselNext className="right-0 top-[40%]" />

                </Carousel>
            </div>

        </div>
    )
}

export default BlogCarousel