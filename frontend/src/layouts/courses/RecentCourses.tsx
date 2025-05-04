import CourseCarousel from "@/components/courses/CourseCarousel"
import { tempCourses as courses } from "@/constants/temp"
import SelfPageLayout from "../SelfPageLayout"
import { getRecentCourses } from "@/lib/utils"

const RecentCourses = ({ className, page }: LayoutPageProps) => {
  const recentCourses = getRecentCourses(courses)
  return (
    page === "self"
      ? (
        <SelfPageLayout className={className} data={recentCourses} title="Recent courses" type="course" />
      )
      : (
        <CourseCarousel title="Recent courses" link="/courses/recent" data={recentCourses} />
      )
  )
}

export default RecentCourses