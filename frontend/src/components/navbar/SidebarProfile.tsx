import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    <Accordion type="single" collapsible className="md:hidden border-b-0">
      <AccordionItem value={username}>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={profile} />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-px">
            <h3 className="text-sm font-semibold capitalize">{username}</h3>
            <span className="text-xs font-extralight font-montserrat capitalize">
              {info}
            </span>
          </div>
        </div>

        <AccordionContent className=" border-b-0"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarProfile;
