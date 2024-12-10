import CourseCarousel from "@/components/courses/CourseCarousel"
import { tempCourses } from "@/constants/temp"
import SelfPageLayout from "../SelfPageLayout"

const RecentCourses = ({ className, page }: LayoutPageProps) => {
  return (
    page === "self"
      ? (
        <SelfPageLayout className={className} data={tempCourses} title="recent courses" type="course" />
      )
      : (
        <CourseCarousel title="recent courses" link="/courses/recent" data={tempCourses} />
      )
  )
}

export default RecentCourses