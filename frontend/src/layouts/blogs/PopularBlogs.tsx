import BlogCarousel from '@/components/blogs/BlogCarousel'
import { tempBlogs } from '@/constants/temp'
import SelfPageLayout from '../SelfPageLayout'

const PopularBlogs = ({ className, page }: LayoutPageProps) => {
    return (
        page === "self"
            ? (
                <SelfPageLayout className={className} data={tempBlogs} title="popular blogs" type="blog" />
            )
            : (
                <section className="padding-x padding-y">
                    <BlogCarousel title='popular blogs' link="/blogs/popular" data={tempBlogs} />
                </section>
            )
    )
}

export default PopularBlogs