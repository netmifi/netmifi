import CourseCarousel from "@/components/CourseCarousel"
import { tempCourses } from "@/constants/temp"


const TopCourses = () => {
    return (
        <CourseCarousel title="top courses" link="/courses/top" data={tempCourses} />
    )
}

export default TopCourses