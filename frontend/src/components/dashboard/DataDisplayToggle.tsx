import { cn } from "@/lib/utils";
import { Grid2X2Icon, List } from "lucide-react";
import { Button } from "../ui/button";

const DataDisplayToggle = ({
  className,
  display,
  setDisplay,
}: DataDisplayToggleProps) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant={"outline"}
        className={cn("[&_svg]:size-6", {
          "bg-red text-popover": display === "grid",
        })}
        onClick={() => setDisplay("grid")}
      >
        <Grid2X2Icon />
      </Button>
      <Button
        variant={"outline"}
        className={cn("[&_svg]:size-6", {
          "bg-red text-popover": display === "list",
        })}
        onClick={() => setDisplay("list")}
      >
        <List />
      </Button>
    </div>
  );
};

export default DataDisplayToggle;
