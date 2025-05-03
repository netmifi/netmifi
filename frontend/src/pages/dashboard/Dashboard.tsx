import AnalyticsCard from "@/components/instructor_dashboard/AnalyticsCard";
import { Book, CoinsIcon, UsersRoundIcon } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { tempCourses as recentPublish } from "@/constants/temp";
import CourseCard from "@/components/courses/CourseCard";

const Dashboard = () => {
  const cardInformation = [
    {
      icon: CoinsIcon,
      label: "Analytics",
      total: 75312,
      link: "/dashboard/analytics",
    },
    {
      icon: Book,
      label: "Courses",
      total: 200,
      link: "/dashboard/my-courses",
    },
    {
      icon: UsersRoundIcon,
      label: "Students",
      total: 3000,
      link: "/dashboard/students",
    },
    {
      icon: UsersRoundIcon,
      label: "Followers",
      total: 290000,
      link: "/dashboard/followers",
    },
    {
      icon: FaBookReader,
      label: "Quiz",
      total: 3140,
      link: "/dashboard/quiz",
    },
  ];
  return (
    <>
      <p className="text-xs sm:text-sm px-4 capitalize">
        Hi <b>Victony Darey</b>, welcome back
      </p>
      <main className="w-full flex flex-col mt-5 gap-4 justify-center">
        <h1 className="sm:my-4 text-center text-xl md:text-2xl lg:text-3xl ">
          What Will You Publish Today
        </h1>
        <section className="w-full md:mx-auto flex flex-wrap gap-4 *:flex-auto  *:min-w-[30%] *:max-w-full px-2 sm:px-4">
          {cardInformation.map((card) => (
            <AnalyticsCard
              count={card.total}
              label={card.label}
              icon={<card.icon />}
              link={card.link}
              isMoney={card.label.includes("analytics")}
              date={new Date()}
            />
          ))}
        </section>

        <section className="block mt-32 mx-auto py- px-2 sm:px-4 bg-popover">
          <h3 className="mb-3 font-bold text-xl sm:text-2xl">
            Recently Published Courses
          </h3>
          <div className="flex flex-wrap gap-5 w-full overflow-y-auto scrollbar-hide h-[400px] items-start ">
            {recentPublish.map((course) => (
              <CourseCard
                course={course}
                page="dashboard"
                id={course.id}
                type={course.type}
                price={course.price}
                category={course.category}
                thumbnail={course.thumbnail}
                title={course.title}
                videoURL={course.videoURL}
                instructorName={course.instructorName}
                instructorProfileImage={course.instructorProfileImage}
                instructorProfileURL={course.instructorProfileURL}
                rating={course.rating}
                reviews={course.reviews}
                isVerified={course.isVerified}
                isFollowing={course.isFollowing}
                date={course.date}
                viewMode = "list"
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
