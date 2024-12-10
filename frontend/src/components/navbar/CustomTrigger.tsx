import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

export function CustomTrigger({ className }: { className?: ClassValue }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant={"transparent"}
      className={cn(
        "size-fit hover:bg-secondary rounded-full p-2 [&_svg]:size-auto",
        className
      )}
      onClick={toggleSidebar}
    >
      <MenuIcon className="text-xl" />
    </Button>
  );
}
