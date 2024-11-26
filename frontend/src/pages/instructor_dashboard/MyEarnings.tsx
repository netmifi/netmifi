import AnalyticsCard from "@/components/instructor_dashboard/AnalyticsCard";
import PayoutSetupDialog from "@/components/instructor_dashboard/PayoutSetupDialog";
import RevenuePerCourse from "@/components/instructor_dashboard/RevenuePerCourse";
import StudentsChartDonut from "@/components/instructor_dashboard/StudentsChartDonut";
// import StudentsChartDonut from "@/components/instructor_dashboard/StudentsChartDonut";
import { CoinsIcon, Wallet2Icon } from "lucide-react";

const MyEarnings = () => {
  return (
    <main className="w-full px-2 sm:px-4">
      <section className="w-full flex justify-end mb-7 ">
        <PayoutSetupDialog />
      </section>

      <section className="flex gap-4 flex-wrap mb-14">
        <div className="flex-grow">
          <AnalyticsCard
            count={75312}
            icon={<CoinsIcon />}
            isMoney={true}
            date={new Date()}
            label="total earning"
          />
        </div>

        <div className="flex-auto">
          <AnalyticsCard
            count={75312}
            icon={<Wallet2Icon />}
            isMoney={true}
            date={new Date()}
            label="available balance"
            isWithdrawal={true}
          />
        </div>
      </section>

      <section className="flex gap-4 flex-wrap w-full">
        <div className="flex-1">
          <StudentsChartDonut />
        </div>

        <div className="flex-auto">
          <RevenuePerCourse />
        </div>
      </section>
    </main>
  );
};

export default MyEarnings;
