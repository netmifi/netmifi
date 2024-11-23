import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant={"transparent"}
      className="size-fit hover:bg-secondary rounded-full p-2 [&_svg]:size-auto"
      onClick={toggleSidebar}
    >
      <MenuIcon className="text-xl" />
    </Button>
  );
}
