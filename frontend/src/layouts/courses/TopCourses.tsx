import CourseCarousel from "@/components/courses/CourseCarousel";
import { tempCourses } from "@/constants/temp";
import SelfPageLayout from "../SelfPageLayout";


const TopCourses = ({ className, page }: LayoutPageProps) => {
    return (
        page === "self"
            ? (
                <SelfPageLayout className={className} data={tempCourses} title="Top courses" type="course" />
            )
            : (
                <CourseCarousel title="Top courses" link="/courses/top" data={tempCourses} />
            )
    )
}

export default TopCourses