import BlogCarousel from '@/components/blogs/BlogCarousel'
import { tempBlogs } from '@/constants/temp'
import SelfPageLayout from '../SelfPageLayout'

const RecentBlogs = ({ className, page }: LayoutPageProps) => {
    return (
        page === "self"
            ? (
                <SelfPageLayout className={className} data={tempBlogs} title="recent blogs" type="blog" />
            )
            : (
                <section className="padding-x padding-y">
                    <BlogCarousel title='recent blogs' link="/blogs/recent" data={tempBlogs} />
                </section>
            )
    )
}

export default RecentBlogs