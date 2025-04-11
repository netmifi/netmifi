import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Extend the ProgressPrimitive.IndicatorProps to include 'barClassName'
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  barClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, barClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all",
        barClassName
      )}
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-10 w-10 transition-all overflow-hidden rounded-full bg-primary flex justify-center items-center drop-shadow`,
      className
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, hsl(var(--primary)) 85%, transparent 80% 100%), conic-gradient(green ${
        value || 0
      }%, hsl(var(--foreground)) 0)`,
    }}
  >
    <div className="text-xs text-primary-foreground">{`${value || 0}%`}</div>
  </ProgressPrimitive.Root>
));
