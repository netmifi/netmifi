import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label, Legend, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CustomLegend } from "./RevenuePerCourse";

const chartData = [
  {
    stat: "Current Students",
    students: Math.floor(Math.random() * 1000),
    fill: "var(--color-current)",
  },
  {
    stat: "Students Graduated",
    students: Math.floor(Math.random() * 1000),
    fill: "var(--color-graduated)",
  },
  {
    stat: "Quiz Participation",
    students: Math.floor(Math.random() * 1000),
    fill: "var(--color-quiz)",
  },
];

const chartConfig = {
  students: {
    label: "Students",
  },
  current: {
    label: "Current Students ",
    color: "hsl(var(--chart-1))",
  },
  graduated: {
    label: "Students Graduated ",
    color: "hsl(var(--chart-2))",
  },
  quiz: {
    label: "Quiz Participation ",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const StudentsChartDonut = () => {
  const totalStudents = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.students, 0);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between w-full ">
        <CardTitle className="text-lg sm:text-xl mb-0">
          Students Statistics
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart className="flex flex-col">
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="text-red *:text-red"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="stat"
              innerRadius={70}
              strokeWidth={5}
              className="flex-auto"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>

            {/* <Legend
              content={<CustomLegend />}
              verticalAlign="top"
              align="left"
            /> */}
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="px-0 flex gap-3 flex-col ">
        {chartData.map((data, index) => (
          <div className="flex gap-2">
            <span
              className={`size-2 rounded-md p-2 bg-[hsl(var(--chart-${
                index + 1
              }))]`}
            ></span>
            <span className="text-xs">{data.stat}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default StudentsChartDonut;
