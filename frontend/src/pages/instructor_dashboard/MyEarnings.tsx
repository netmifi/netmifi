import AnalyticsCard from "@/components/instructor_dashboard/AnalyticsCard";
import PayoutSetupDialog from "@/components/instructor_dashboard/PayoutSetupDialog";
import RevenuePerCourse from "@/components/instructor_dashboard/RevenuePerCourse";
import StudentsChartDonut from "@/components/instructor_dashboard/StudentsChartDonut";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import StudentsChartDonut from "@/components/instructor_dashboard/StudentsChartDonut";
import { CoinsIcon, Wallet2Icon } from "lucide-react";
import DataDisplayToggle from "../../components/instructor_dashboard/DataDisplayToggle";
import { SetStateAction, useState } from "react";
import CustomTable from "@/components/CustomTable";
import ViewTransaction from "@/components/instructor_dashboard/ViewTransaction";

const earnings = [
  {
    id: "178191-18991019-10909904",
    courseName: "product design for pros",
    transactionId: "#910x24btx",
    boughtBy: "andres santos",
    date: new Date(),
    amount: 25000,
    status: "error",
  },
  {
    id: "14920-18991019-10909904",
    courseName: "content production: camera angles",
    transactionId: "2930gd-3829",
    boughtBy: "carmila gordon",
    date: new Date(),
    amount: 91600,
    status: "success",
  },
  {
    id: "90145-203290e43-1078324",
    courseName: "content production: studio setting",
    transactionId: "156kb2",
    boughtBy: "andres santos",
    date: new Date(),
    amount: 40200,
    status: "pending",
  },
  {
    id: "59034-438903-10909904",
    courseName: "product design for pros",
    transactionId: "10208de9",
    boughtBy: "chinedu stephen",
    date: new Date(),
    amount: 25000,
    status: "success",
  },
];

const MyEarnings = () => {
  const [display, setDisplay] = useState<"list" | "grid">("list");
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

      <section className="flex gap-4 flex-wrap w-full max-lg:flex-col mb-20">
        <div className="flex-1">
          <StudentsChartDonut />
        </div>

        <div className="flex-auto">
          <RevenuePerCourse />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle className="text-lg md:text-xl flex flex-row justify-between">
              Course Purchases
            </CardTitle>

            {/* <CardDescription className="">
              <DataDisplayToggle display={display} setDisplay={setDisplay} />
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            {display === "list" ? (
              <CustomTable
                data={[...earnings]}
                deleteURL=""
                isDialog={true}
                isEdit={false}
                ViewComponent={ViewTransaction}
                keys={[
                  "courseName",
                  "transactionId",
                  "boughtBy",
                  "amount",
                  "status",
                  "date",
                ]}
                pageSize={20}
                lastPage={8}
                promptLabel={"courseName"}
                setData={function (
                  value: SetStateAction<
                    {
                      id: string;
                      courseName: string;
                      transactionId: string;
                      boughtBy: string;
                      date: string;
                      amount: number;
                      status: string;
                    }[]
                  >
                ): void {
                  throw new Error("Function not implemented.");
                }}
                specialStyle={[
                  {
                    column: "courseName",
                    className: "capitalize",
                  },
                  {
                    column: "boughtBy",
                    className: "capitalize",
                  },
                  {
                    column: "status",
                    className: "capitalize",
                  },
                ]}
              />
            ) : (
              ""
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default MyEarnings;
