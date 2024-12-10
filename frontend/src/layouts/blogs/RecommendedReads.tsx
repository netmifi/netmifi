import BlogCarousel from '@/components/blogs/BlogCarousel'
import { tempBlogs } from '@/constants/temp'

const RecommendedReads = () => {
    return (
            <BlogCarousel title='recommended reads' data={tempBlogs} />
    )
}

export default RecommendedReads;