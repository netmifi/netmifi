import BrandIcon from "@/components/navbar/BrandIcon";
import SearchBox from "@/components/navbar/SearchBox";
import { Button } from "@/components/ui/button";
import { useStoreActions, useStoreState } from "@/store/store";
import { FaBars, FaEllipsis, FaTrash } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarPopover from "@/components/navbar/NavbarPopover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/assets/images";
import useWindowSize from "@/hooks/useWindowSize";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";

const UserNavbar = () => {
  const { width } = useWindowSize();

  const navState = useStoreState((state) => state.nav.navState);
  const setNavState = useStoreActions((action) => action.nav.set);

  return (
    <div>
      <div className=" bg-background flex justify-between padding-x py-3 shadow-sm">
        <div className="flex gap-1">
          <Button
            onClick={() => setNavState(!navState)}
            className="bg-transparent sm:text-xl text-low-contrast rounded-full hover:bg-primary-foreground"
          >
            <FaBars />
          </Button>

          <BrandIcon type="user" />
        </div>

        <div className="flex gap-2 items-center sm:gap-1 md:gap-5">
          <SearchBox type={width && width >= 768 ? "user" : "guest"} />

          <NavbarPopover type="notification" counter={50}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <NavLink
                  to={""}
                  className="flex  capitalize items-center gap-2 hover:underline underline-offset-4"
                >
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  new notification
                </NavLink>

                <Popover>
                  <PopoverTrigger>
                    <FaEllipsis />
                  </PopoverTrigger>

                  <PopoverContent className="w-[200px] flex">
                    <Button className="bg-transparent text-lg mx-auto text-red">
                      <FaTrash /> &nbsp; Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </NavbarPopover>
          <NavbarPopover type="cart" counter={50} />
          <NavbarPopover type="message" counter={50} />

     
          {/* <ModeToggle /> */}
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default UserNavbar;
