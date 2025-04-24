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
    <Accordion type="single" collapsible className="md:hidden">
      <AccordionItem value={username} className="pb-3 border-none">
        <div className="flex gap-2 items-center">
          <div className="relative">
            {/* className="bg-popover absolute bottom-[10%] right-[0%] shadow-sm rounded-full size-fit z-20 p-0 [&_svg]:text-red" */}
            <AccordionTrigger className="size-fit p-0 bg-transparent [&_svg]:bg-primary/40 [&_svg]:absolute [&_svg]:right-[0%] [&_svg]:bottom-[10%]  [&[data-state=open]]:bg-transparent [&_svg]:text-popover">
              {" "}
              <Avatar className="size-fit">
                <AvatarImage src={profile} className="size-[4rem] md:size-[5rem]" />
                <AvatarFallback className="size-[4rem] md:size-[5rem] text-4xl">
                  {username.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </AccordionTrigger>
          </div>

          <div className="flex flex-col items-start gap-px">
            <h3 className="text-sm font-semibold capitalize">{username}</h3>
            <span className="text-xs font-extralight font-montserrat capitalize">
              {info}
            </span>
          </div>
        </div>

        <AccordionContent className="flex flex-col gap-2 pt-2 pb-0">
          <NavLink
            to={"/account/profile"}
            className={({ isActive }: { isActive?: boolean }) =>
              isActive ? "w-full *:border-red p-2 *:bg-destructive/40" : ""
            }
          >
            <Button
              variant={"secondary"}
              className=" w-full flex gap-3 px-8 border border-secondary hover:border-red hover:bg-destructive/40"
            >
              <UserIcon /> Profile
            </Button>
          </NavLink>

          <NavLink
            to={"/account/settings"}
            className={({ isActive }: { isActive?: boolean }) =>
              isActive ? "w-full *:border-red p-2 *:bg-destructive/40" : ""
            }
          >
            <Button
              variant={"secondary"}
              className=" w-full flex gap-3 px-8 border border-secondary hover:border-red hover:bg-destructive/40"
            >
              <SettingsIcon />
              Settings
            </Button>
          </NavLink>
          <LogoutModal
            triggerChild={
              <Button
                variant={"secondary"}
                className="px-8 flex gap-3 border border-secondary hover:border-red hover:bg-destructive/40"
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
