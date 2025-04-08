import { useApp } from "@/app/app-provider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import {
  ArrowUpRightFromCircleIcon,
  BadgeIcon,
  BellRing,
  EllipsisVerticalIcon,
  MessageSquare,
  ShoppingCart,
  TrashIcon,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";

const NavbarPopover = ({
  type,
}: {
  type: "message" | "notification" | "cart";
}) => {
  const { cartItems, setCartItems } = useApp();
  const notifications = [];

  const counter =
    type === "cart"
      ? cartItems.length
      : type === "notification"
      ? notifications.length
      : 0;

  const handleRemoveCartItem = (course: Course) => {
    const newCart = cartItems.filter((item) => course.id === item.id);
    setCartItems(newCart);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button className="bg-transparent text-low-contrast hover:bg-transparent px-1">
            {counter > 0 && (
              <BadgeIcon className="absolute -top-0 right-0 scale-75 text-red fill-red" />
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
      <PopoverContent className="text-center max-w-full p-0 max-sm:w-screen sm:min-w-96">
        <ScrollArea className="">
          {/* CART CHILDREN */}
          {type === "cart" &&
            ((cartItems.length > 0 && (
              <div className="flex flex-col max-h-[70dvh]">
                <div className="flex flex-col">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex">
                      <Button
                        variant={"ghost"}
                        className="flex-grow hover:bg-secondary text-xs text-left justify-between rounded-none max-w-[90%] overflow-hidden flex-shrink-0"
                      >
                        {item.title.length > 25
                          ? item.title.slice(0, 25) + "..."
                          : item.title}

                        <span className="text-red text-xs flex gap-px [&_svg]:size-3 items-center">
                          <FaNairaSign /> {item.price}
                        </span>
                      </Button>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"ghost"} className="bg px-1">
                            <EllipsisVerticalIcon />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0 flex *:flex-grow w-fit *:rounded-none overflow-hidden">
                          <Button
                            variant="primary"
                            className="hover:bg-primary/80 hover:text-popover"
                          >
                            <ArrowUpRightFromCircleIcon />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleRemoveCartItem(item)}
                            className="hover:bg-primary/80 hover:text-popover"
                          >
                            <TrashIcon />
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ))}
                </div>
                <div className="sticky bottom-0 w-full bg-secondary shadow-sm p-4">
                  <Button className="w-full ">
                    Check All <ArrowUpRightFromCircleIcon />
                  </Button>
                </div>
              </div>
            )) || <></>)}

          {counter < 1 && <p>No {type} item found</p>}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarPopover;
