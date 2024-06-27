import CourseCarousel from "@/components/CourseCarousel"
import { tempCourses } from "@/constants/temp"

const RecentCourses = () => {
  return (
    <CourseCarousel title="recent courses" link="/courses/recent" data={tempCourses}  />

  )
}

export default RecentCourses