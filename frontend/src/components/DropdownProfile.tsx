import { NavLink } from "react-router-dom";
import { profile } from "@/assets/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const DropdownProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <Avatar>
          <AvatarImage src={profile} />
          <AvatarFallback>NM</AvatarFallback>
        </Avatar>

        <p className="capitalize text-sm hidden md:block">thompson</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1">
          <NavLink
            to={"/account/profile"}
            className={({ isActive }) =>
              isActive ? "w-full *:border-red *:bg-destructive/40" : ""
            }
          >
            <Button
              variant={"secondary"}
              className=" w-full flex gap-3 px-10 border border-secondary hover:border-red hover:bg-destructive/40"
            >
              <UserIcon /> Profile
            </Button>
          </NavLink>

          <NavLink
            to={"/account/settings"}
            className={({ isActive }) =>
              isActive ? "w-full *:border-red *:bg-destructive/40" : ""
            }
          >
            <Button
              variant={"secondary"}
              className=" w-full flex gap-3 px-10 border border-secondary hover:border-red hover:bg-destructive/40"
            >
              <SettingsIcon />
              Settings
            </Button>
          </NavLink>
          <LogoutModal
            triggerChild={
              <Button
                variant={"secondary"}
                className="px-10 flex gap-3 border border-secondary hover:border-red hover:bg-destructive/40"
              >
                <LogOutIcon />
                Logout
              </Button>
            }
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownProfile;
