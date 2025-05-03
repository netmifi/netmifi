import { useState } from "react";
import {
  Bar,
  XAxis,
  Legend,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CircleDollarSignIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import MoneyIcon from "../assets/images/money.svg";
const generateDailyData = () => {
  const data = [];
  for (let i = 1; i <= 31; i++) {
    data.push({
      date: `${i}`,
      "Total Earning": Math.floor(Math.random() * 5000),
      "Product cost": Math.floor(Math.random() * 3000),
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const weeksInYear = 52;
  const data = [];
  for (let i = 0; i < weeksInYear; i++) {
    data.push({
      week: `${i + 1}`,
      "Total Earning": Math.floor(Math.random() * 25000),
      "Product cost": Math.floor(Math.random() * 15000),
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map((month) => ({
    month,
    "Total Earning": Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
    "Product cost": Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
  }));

  return data;
};

export const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex items-center mt-1 w-full">
      {payload &&
        payload.map((entry, index) => (
          <span
            key={`item-${index}`}
            className="mr-10 flex items-center font-normal text-sm"
          >
            <svg width="10" height="10" className="mr-1 items-center">
              <rect width="10" height="10" fill={entry.color} />
            </svg>
            {entry.value}
          </span>
        ))}
    </div>
  );
};
// @ts-expect-error Cannot find name 'CustomBarProps'
const CustomBar = ({ fill, x, y, width, height }: CustomBarProps) => {
  const radius = 10;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius}
      ry={radius}
    />
  );
};
const RevenuePerCourse = () => {
  const [selectedTab, setSelectedTab] = useState<string>("month");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };
  let chartData;
  switch (selectedTab) {
    case "day":
      chartData = generateDailyData();
      break;
    case "week":
      chartData = generateWeeklyData();
      break;
    case "month":
    default:
      chartData = generateMonthlyData();
  }

  return (
    <Card className="relative w-full p-4 rounded-xl h-full px-0">
      <CardHeader className="w-full flex flex-row  justify-between flex-wrap max-md:flex-col">
        <CardTitle className="flex gap-2 items-center">
          <span className="grid place-items-center bg-low-red shadow-md rounded-2xl size-12 text-red">
            <CircleDollarSignIcon />
          </span>
          <h3 className="text-base md:text-lg">Revenue Analysis</h3>
        </CardTitle>
        <div className="flex justify-end bg-secondary rounded-xl w-fit p-1">
          <div className="flex justify-between">
            <Button
              variant={"transparent"}
              className={cn("rounded-lg", {
                "bg-red text-popover": selectedTab === "day",
              })}
              onClick={() => handleTabChange("day")}
            >
              Daily
            </Button>
            <Button
              variant={"transparent"}
              className={cn("rounded-lg", {
                "bg-red text-popover": selectedTab === "week",
              })}
              onClick={() => handleTabChange("week")}
            >
              Weekly
            </Button>
            <Button
              variant={"transparent"}
              className={cn("rounded-lg", {
                "bg-red text-popover": selectedTab === "month",
              })}
              onClick={() => handleTabChange("month")}
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer className="mx-auto aspect-square max-h-[250px]">
          <BarChart data={chartData}>
            <XAxis dataKey={selectedTab} />
            <Tooltip />
            <Bar
              dataKey="Total Earning"
              fill="hsl(var(--chart-2)"
              shape={<CustomBar />}
            />
            <Bar
              dataKey="Product cost"
              fill="hsl(var(--chart-1)"
              shape={<CustomBar />}
            />

            <Legend
              content={<CustomLegend />}
              verticalAlign="top"
              align="left"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenuePerCourse;
