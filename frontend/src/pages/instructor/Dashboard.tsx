import { Book, CoinsIcon, UsersRoundIcon } from "lucide-react";
import { FaBookReader } from "react-icons/fa";

const Dashboard = () => {
  const cardInfomations = [
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
    <main>
      <section className="flex flex-wrap">
        dgvsghdvsghvdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      </section>
    </main>
  );
};

export default Dashboard;
