import DropdownProfile from "@/components/DropdownProfile";
import NavbarPopover from "@/components/navbar/NavbarPopover";
import SearchBox from "@/components/navbar/SearchBox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import useWindowSize from "@/hooks/useWindowSize";
import { MenuIcon, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = ({ isNavOpen, setIsNavOpen }: NavBarProps) => {
  const { width } = useWindowSize();

  return (
    <div className="w-full shadow-sm flex justify-between py-3 px-4 items-center">
      <section className="flex w-auto flex-grow gap-2 sm:gap-4 items-center">
        <Button
          variant={"transparent"}
          className="size-fit hover:bg-secondary rounded-full p-2 [&_svg]:size-auto"
          onClick={() => setIsNavOpen && setIsNavOpen(!isNavOpen)}
        >
          <MenuIcon className="text-xl" />
        </Button>

        <div className="">
          <SearchBox type={width && width >= 768 ? "user" : "guest"} />
        </div>
      </section>

      <section className="flex gap-2 sm:gap-4 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="/dashboard/create">
                <PlusCircleIcon className="fill-red text-secondary size-6 sm:size-7" />
              </Link>
            </TooltipTrigger>

            <TooltipContent>Create new course</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <NavbarPopover type="notification" counter={50} />

        <DropdownProfile />
      </section>
    </div>
  );
};

export default TopBar;
