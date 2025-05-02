import { cn, convertToReadableNumber } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ChevronRightCircleIcon,
  EyeIcon,
  EyeOffIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface DashboardCardProps {
  count: number;
  label: string;
  link: string;
  icon: React.ReactNode;
  isMoney?: boolean;
  isWithdrawal?: boolean;
  description?: string;
  trend?: string;
}

const AnalyticsCard = ({
  count,
  label,
  link,
  icon,
  isMoney,
  isWithdrawal,
  description,
  trend,
}: DashboardCardProps) => {
  const [_visible, _setVisible] = useState(false);
  const isPositiveTrend = trend?.includes("+");

  return (
    <Card className="bg-white p-0 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col gap-4">
        <CardHeader className="flex flex-row p-0 gap-3 items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <div className="bg-red-50 size-fit rounded-md text-red p-2 text-lg *:size-5 *:sm:size-6">
              {icon}
            </div>
            <div className="flex flex-col">
              <CardTitle className="capitalize text-base font-medium">
                {label}
              </CardTitle>
              {description && (
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </div>
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

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">
              {isMoney ? "$" : ""}
              {_visible ? convertToReadableNumber(count) : "****"}
            </p>
            {trend && (
              <div className="flex items-center gap-1 text-sm mt-1">
                {isPositiveTrend ? (
                  <TrendingUp className="text-green-500 size-4" />
                ) : (
                  <TrendingDown className="text-red-500 size-4" />
                )}
                <span className={cn(
                  "font-medium",
                  isPositiveTrend ? "text-green-500" : "text-red-500"
                )}>
                  {trend}
                </span>
              </div>
            )}
          </div>
          <Link to={link}>
            <Button variant="ghost" size="icon">
              <ChevronRightCircleIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
