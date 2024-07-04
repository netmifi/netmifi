import CourseCarousel from "@/components/courses/CourseCarousel";
import { tempCourses } from "@/constants/temp";
import SelfPageLayout from "../SelfPageLayout";


const TopCourses = ({ className, page }: LayoutPageProps) => {
    return (
        page === "self"
            ? (
                <SelfPageLayout className={className} data={tempCourses} title="top courses" type="course" />
            )
            : (
                <CourseCarousel title="top courses" link="/courses/top" data={tempCourses} />
            )
    )
}

export default TopCourses