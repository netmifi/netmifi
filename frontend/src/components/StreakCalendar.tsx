import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

interface StreakDay {
  date: Date
  points: number
  status?: "default" | "completed" | "bonus" | "multiplier" | "highlighted"
}

interface StreakCalendarProps {
  className?: string
  totalPoints: number
  multiplierInfo?: {
    date: Date
    multiplier: number
  }
  streakDays?: StreakDay[]
  defaultMonth?: Date
  onDateSelect?: (date: Date) => void
}

export function StreakCalendar({
  className,
  totalPoints,
  multiplierInfo,
  streakDays = [],
  defaultMonth = new Date(),
  onDateSelect,
}: StreakCalendarProps) {
  const [month, setMonth] = React.useState<Date>(defaultMonth)

  // Function to get the status and points for a specific date
  const getDayInfo = (date: Date): StreakDay | undefined => {
    return streakDays.find(
      (day) =>
        day.date.getDate() === date.getDate() &&
        day.date.getMonth() === date.getMonth() &&
        day.date.getFullYear() === date.getFullYear(),
    )
  }

  // Custom day renderer for the Calendar component
  const renderDay = (
    day: Date,
    selectedDays: Date[] | undefined,
    dayProps: React.HTMLAttributes<HTMLButtonElement>,
  ) => {
    const dayInfo = getDayInfo(day)
    const isCurrentMonth = day.getMonth() === month.getMonth()

    // Determine the CSS classes based on the day's status
    const statusClass =
      dayInfo?.status === "highlighted"
        ? "bg-red-600 text-white hover:bg-red-700"
        : dayInfo?.status === "completed"
          ? "text-green-500"
          : dayInfo?.status === "bonus"
            ? "text-yellow-500"
            : dayInfo?.status === "multiplier"
              ? "text-blue-500"
              : ""

    return (
      <div className="relative w-full p-0 flex flex-col items-center">
        <div
          {...dayProps}
          className={cn(
            dayProps.className,
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center",
            statusClass,
            !isCurrentMonth && "text-muted-foreground opacity-50",
          )}
          onClick={(e) => {
            dayProps.onClick?.(e)
            if (onDateSelect) onDateSelect(day)
          }}
        >
          {format(day, "d")}
        </div>
        {isCurrentMonth && (
          <div className={cn("text-xs mt-1", statusClass ? "" : "text-muted-foreground")}>{dayInfo?.points || 5}pt</div>
        )}
      </div>
    )
  }

  // Format the multiplier date for display
  const formatMultiplierDate = (date: Date) => {
    return `${format(date, "EEE").toLowerCase()} ${format(date, "d")}`
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-6">
        <div className="text-lg font-bold text-red-600">{totalPoints} Points</div>
        {multiplierInfo && (
          <div className="text-sm">
            Get x{multiplierInfo.multiplier} points by {formatMultiplierDate(multiplierInfo.date)}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="border border-blue-500 rounded-lg p-4 mx-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              className="h-7 w-7 p-0 rounded-full"
              onClick={() => setMonth(addDays(month, -30))}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <div className="font-medium">{format(month, "MMMM yyyy")}</div>
            <Button variant="outline" className="h-7 w-7 p-0 rounded-full" onClick={() => setMonth(addDays(month, 30))}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            className="p-0"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
              caption: "hidden", // Hide the default caption as we have our own header
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
              row: "flex w-full mt-2",
              cell: "text-center text-sm relative p-0 flex-1 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "day-outside text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              Day: ({ date, ...props }) => renderDay(date, [], props),
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
