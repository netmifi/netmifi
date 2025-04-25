import AnalyticsCard from "@/components/instructor_dashboard/AnalyticsCard";
import { Book, CoinsIcon, UsersRoundIcon } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { tempCourses as recentPublish } from "@/constants/temp";
import CourseCard from "@/components/courses/CourseCard";

const Dashboard = () => {
  const cardInformation = [
    {
      icon: CoinsIcon,
      label: "total earnings",
      total: 75312,
      link: "/dashboard/my-earnings",
    },
    {
      icon: Book,
      label: "total courses",
      total: 200,
      link: "/dashboard/my-courses",
    },
    {
      icon: FaBookReader,
      label: "total students",
      total: 3000,
      link: "/dashboard/home/students",
    },
    {
      icon: UsersRoundIcon,
      label: "net followers",
      total: 290000,
      link: "/dashboard/home/followers",
    },
    {
      icon: UsersRoundIcon,
      label: "certified students",
      total: 3140,
      link: "/dashboard/home/certified-students",
    },
  ];
  return (
    <>
      <p className="text-xs sm:text-sm px-4 capitalize">
        Hi <b>Victony Darey</b>, welcome back
      </p>
      <main className="w-full flex flex-col mt-5 gap-10 justify-center">
        <h1 className="sm:my-4 text-center text-xl md:text-2xl lg:text-3xl ">
          What Will You Publish Today
        </h1>
        <section className="w-full md:mx-auto flex flex-wrap gap-5 *:flex-auto  *:min-w-[30%] *:max-w-full px-2 sm:px-4">
          {cardInformation.map((card) => (
            <AnalyticsCard
              count={card.total}
              label={card.label}
              icon={<card.icon />}
              link={card.link}
              isMoney={card.label.includes("earning")}
              date={new Date()}
            />
          ))}
        </section>

        <section className="block mt-32 mx-auto py-4 px-2 sm:px-4 bg-popover">
          <h3 className="mb-3 font-bold text-xl sm:text-2xl">
            Recently Published Courses
          </h3>
          <div className="flex flex-wrap gap-5 w-full items-start ">
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
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
