import DashboardCard from "@/components/DashboardCard";
import { Book, CoinsIcon, UsersRoundIcon } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { tempPurchasedCourses as recentPublish } from "@/constants/temp";
import CourseCard from "@/components/courses/CourseCard";
import MyCourseCard from "@/components/courses/my-courses/MyCourseCard";
const Dashboard = () => {
  const cardInformation = [
    {
      icon: CoinsIcon,
      label: "total earnings",
      total: 75312,
      link: "/dashboard/earnings",
    },
    {
      icon: Book,
      label: "total courses",
      total: 200,
      link: "/dashboard/courses",
    },
    {
      icon: FaBookReader,
      label: "total students",
      total: 3000,
      link: "/dashboard/students",
    },
    {
      icon: UsersRoundIcon,
      label: "net followers",
      total: 290000,
      link: "/dashboard/earnings",
    },
    {
      icon: UsersRoundIcon,
      label: "certified students",
      total: 3140,
      link: "/dashboard/earnings",
    },
  ];
  return (
    <main className="w-full flex flex-col mt-5 gap-10 justify-center">
      <h1 className="sm:my-4 text-center text-xl md:text-2xl lg:text-3xl ">
        What will You Publish Today
      </h1>
      <section className="w-full md:mx-auto flex flex-wrap gap-5 *:flex-auto  *:min-w-[30%] *:max-w-full">
        {cardInformation.map((card) => (
          <DashboardCard
            count={card.total}
            label={card.label}
            icon={<card.icon />}
            link={card.link}
            isMoney={card.label.includes("earning")}
            date={new Date()}
          />
        ))}
      </section>

      <section className="block mt-32 mx-auto">
        <h3 className="mb-3 font-bold text-xl sm:text-2xl">
          Recently Published Courses
        </h3>
        <div className="flex flex-wrap gap-5 mx-auto w-full items-start">
          {recentPublish.map((course) => (
            <MyCourseCard course={course} type={"on-page"} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
