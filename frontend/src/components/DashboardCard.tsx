import { convertToReadableNumber } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRightCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardCard = ({
  count,
  label,
  link,
  icon,
  isMoney,
  date,
}: DashboardCardProps) => {
  return (
    <Card className="bg-dashboard-card p-0 rounded-2xl border-none">
      <CardContent className="p-6 flex flex-col gap-8 items-start">
        <CardHeader className="flex flex-row p-0 gap-3 items-center">
          <div className="bg-popover size-fit rounded-md text-red p-2 text-lg *:size-5 *:sm:size-7">
            {icon}
          </div>

          <CardTitle className="capitalize text-lg font-medium">
            {label}
          </CardTitle>
        </CardHeader>
        <CardFooter className="p-0 flex flex-row justify-between w-full items-end">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-3xl sm:text-4xl font-semibold">
              {isMoney && "$"}
              {count > 10000
                ? convertToReadableNumber(count)
                : count.toLocaleString()}
            </h3>

            <p className="text-xs sm:text-sm">Updated {date?.toDateString()}</p>
          </div>

          {link && (
            <Link to={link}>
              <ChevronRightCircleIcon className="fill-popover md:size-[2rem]" />
            </Link>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
