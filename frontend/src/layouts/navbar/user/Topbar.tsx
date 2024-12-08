import DropdownProfile from "@/components/navbar/DropdownProfile";
import { CustomTrigger } from "@/components/navbar/CustomTrigger";
import NavbarPopover from "@/components/navbar/NavbarPopover";
import { CustomLogo } from "@/components/CustomLogo";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NavSearch from "@/components/navbar/NavSearch";

const TopBar = ({
  state,
  open,
}: {
  state: userType["type"];
  open: boolean;
}) => {
  return (
    <div className="sticky top-0 z-30 w-full shadow-sm flex justify-between gap-3 py-3 px-4 items-center bg-sidebar">
      <section className="flex w-auto gap-2 sm:gap-2 items-center">
        <CustomTrigger />
        <Link to="">
          <CustomLogo
            className={cn(
              "w-[8rem] max-sm:w-[2rem] transition-all duration-1000 ease-in-out",
              {
                hidden: open,
              }
            )}
            logoScreenSize="sm"
          />
        </Link>
        {/* 
        <div className="">
          <SearchBox type={width && width >= 768 ? "user" : "guest"} />
        </div> */}
      </section>

      <section className="flex-grow flex justify-end sm:justify-center items-center max-w-[70%]">
        <NavSearch
          fullScreen="sm"
          floating="float"
          searchFloatButtonClassName="[&_svg]:size-5"
          containerClassName="max-sm:w-auto"
        />
      </section>

      <section className="flex gap-2 sm:gap-4 items-center">
        {state === "instructor" && (
          <Tooltip>
            <TooltipTrigger>
              <Link to="/dashboard/create">
                <PlusCircleIcon className="fill-red text-secondary size-5 sm:size-7" />
              </Link>
            </TooltipTrigger>

            <TooltipContent>Create new course</TooltipContent>
          </Tooltip>
        )}

        <NavbarPopover type="notification" />

        {state === "user" && <NavbarPopover type="cart" />}

        <div className="max-sm:hidden">
          <DropdownProfile />
        </div>
      </section>
    </div>
  );
};

export default TopBar;
