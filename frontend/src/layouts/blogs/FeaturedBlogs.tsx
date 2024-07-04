import BlogCarousel from '@/components/blogs/BlogCarousel'
import { tempBlogs } from '@/constants/temp'
import SelfPageLayout from '../SelfPageLayout'

const FeaturedBlogs = ({ className, page }: LayoutPageProps) => {
    return (
        page === "self"
            ? (
                <SelfPageLayout className={className} data={tempBlogs} title="featured articles" type="blog" />
            )
            : (
                <section className="padding-x padding-y">
                    <BlogCarousel title='featured articles' link="/blogs/featured" data={tempBlogs} />
                </section>
            )
    )
}

export default FeaturedBlogs