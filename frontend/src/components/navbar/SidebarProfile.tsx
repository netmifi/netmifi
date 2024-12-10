import { Link, NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";

const SidebarProfile = ({
  username,
  profile,
  info,
}: {
  username: string;
  profile?: string;
  info: string;
}) => {
  return (
    <Accordion type="single" collapsible className="md:hidden ">
      <AccordionItem value={username} className="pb-3">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Link to="/account/profile">
              <Avatar className="size-fit">
                <AvatarImage src={profile} className="size-[5rem]" />
                <AvatarFallback className="size-[5rem] text-5xl">
                  {username.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>

            <AccordionTrigger className="bg-popover absolute bottom-[10%] right-[0%] shadow-sm rounded-full size-fit z-20 p-0 [&_svg]:text-red"></AccordionTrigger>
          </div>

          <div className="flex flex-col items-start gap-px">
            <h3 className="text-sm font-semibold capitalize">{username}</h3>
            <span className="text-xs font-extralight font-montserrat capitalize">
              {info}
            </span>
          </div>
        </div>

        <AccordionContent className="flex flex-col gap-2 pt-3 pb-0">
          <NavLink
            to={"/account/profile"}
            className={({ isActive }: { isActive?: boolean }) =>
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
            className={({ isActive }: { isActive?: boolean }) =>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarProfile;
