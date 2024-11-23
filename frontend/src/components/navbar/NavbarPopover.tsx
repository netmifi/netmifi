import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { BellRing, MessageSquare, ShoppingCart } from "lucide-react";

const NavbarPopover = ({
  children = "",
  type,
  counter,
}: {
  children?: JSX.Element | string;
  type: "message" | "notification" | "cart";
  counter: number;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button className="bg-transparent text-low-contrast hover:bg-transparent px-1">
            {counter > 0 && (
              <small className="absolute -top-px right-0 scale-75 bg-red font-montserrat rounded-full size-fit px-1 text-secondary font-bold z-30">
                {counter}
              </small>
            )}
            <div className="[&_svg]:size-6">
              {type === "message" ? (
                <MessageSquare />
              ) : type === "notification" ? (
                <BellRing />
              ) : (
                <ShoppingCart />
              )}{" "}
            </div>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="text-center max-h-[300px] max-w-full">
        <ScrollArea className="h-full">
          {children || <p>No {type} item found</p>}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarPopover;
