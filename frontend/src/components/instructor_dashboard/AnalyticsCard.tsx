import { cn, convertToReadableNumber } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  AsteriskIcon,
  ChevronRightCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import WithdrawDialog from "./WithdrawDialog";
import { useState } from "react";

const AnalyticsCard = ({
  count,
  label,
  link,
  icon,
  isMoney,
  isWithdrawal,
  date,
}: DashboardCardProps) => {
  const [_visible, _setVisible] = useState(false);
  return (
    <Card className="bg-dashboard-card p-0 rounded-2xl border-none">
      <CardContent className="p-6 flex flex-col gap-8 items-start">
        <CardHeader className="flex flex-row p-0 gap-3 items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <div className="bg-popover size-fit rounded-md text-red p-2 text-lg *:size-5 *:sm:size-7">
              {icon}
            </div>

            <CardTitle className="capitalize text-lg font-medium">
              {label}
            </CardTitle>
          </div>

          {isMoney && (
            <Button
              size={"no-pad"}
              variant={"transparent"}
              onClick={() => _setVisible(!_visible)}
            >
              {_visible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          )}
        </CardHeader>
        <CardFooter
          className={cn("p-0 flex flex-row justify-between w-full items-end", {
            "items-center": isWithdrawal,
          })}
        >
          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-3xl sm:text-4xl font-semibold">
              {isMoney && !_visible ? (
                <div className="flex gap-px">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <AsteriskIcon key={index} className="text-red size-8" />
                  ))}
                </div>
              ) : (
                <>
                  {isMoney && "$"}
                  {count > 10000
                    ? convertToReadableNumber(count)
                    : count.toLocaleString()}
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm">Updated {date?.toDateString()}</p>
          </div>
          <div className="flex flex-col gap-3">
            {isWithdrawal && (
              <WithdrawDialog
                trigger={<Button className="rounded-full">Withdraw</Button>}
              />
            )}
            {link && (
              <Link to={link}>
                <ChevronRightCircleIcon className="fill-popover md:size-[2rem]" />
              </Link>
            )}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
