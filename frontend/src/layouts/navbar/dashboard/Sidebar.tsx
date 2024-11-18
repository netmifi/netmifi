import { logoText } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { instructorDashboardLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isNavOpen, setIsNavOpen }: NavBarProps) => {
  return (
    <>
      <aside
        className={cn(
          "min-h-screen overflow-x-hidden absolute bottom-0 lg:sticky left-0 bg-background shadow-md flex flex-col gap-10 z-40 w-[15rem] transition-all",
          {
            "w-0": !isNavOpen,
          }
        )}
      >
        <div className="flex relative border-b px-2 pt-2 pb-[0.95rem]">
          <Link to="/home" className=" flex justify-center">
            <img src={logoText} className="w-[80%] h-[50px]" alt="" />
          </Link>

          <Button
            className="absolute top-2 right-1 size-fit p-0"
            onClick={() => setIsNavOpen!(false)}
          >
            <XIcon />
          </Button>
        </div>

        <ScrollArea>
          <ul className="flex flex-col items-end">
            {instructorDashboardLinks.map((link) => (
              <li
                key={link.label}
                className="flex w-[90%] *:w-full *:h-full *:px-3 *:py-3 *:flex *:gap-4 *:items-center"
              >
                <NavLink
                  to={link.href}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-red *:text-popover rounded-s-2xl"
                      : ""
                  }
                >
                  <span className="text-red">{<link.icon />}</span>
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>
      <div
        className={cn(
          "lg:hidden bg-foreground/70 w-full h-full z-30 fixed top-0",
          {
            hidden: !isNavOpen,
          }
        )}
        onClick={() => setIsNavOpen!(false)}
      ></div>
    </>
  );
};

export default Sidebar;
