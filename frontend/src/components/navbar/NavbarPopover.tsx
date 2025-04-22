import { useApp } from "@/app/app-provider";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import {
  ArrowUpRightFromCircleIcon,
  BadgeIcon,
  BellRing,
  MessageSquare,
  ShoppingCart,
  TrashIcon,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useRemoveFromCart } from "@/api/hooks/cart/useRemoveFromCart";
import { toast } from "sonner";
import Loader from "../Loader";

const NavbarPopover = ({
  type,
}: {
  type: "message" | "notification" | "cart";
}) => {
  const { cartItems } = useApp();
  const notifications = [];
  const mutation = useRemoveFromCart();

  const counter =
    type === "cart"
      ? cartItems?.length
      : type === "notification"
      ? notifications?.length
      : 0;


  const handleRemoveCartItem = async (cartItem: {title: string}) => {
    try {
      console.log(cartItem)
      const { data } = await mutation.mutateAsync(cartItem);
      console.log(data);
      toast.success(`${cartItem.title} has been removed from your cart`);
    } catch (error) {
      mutationErrorHandler(error);
    }
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
            ((cartItems?.length > 0 && (
              <div className="flex flex-col max-h-[70dvh]">
                <div className="flex flex-col">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex">
                      <Button
                        variant={"ghost"}
                        className="flex-grow hover:bg-secondary text-xs text-left justify-between rounded-none max-w-[90%] overflow-hidden flex-shrink-0"
                      >
                        {item?.title?.length > 25
                          ? item.title.slice(0, 25) + "..."
                          : item.title}

                        <span className="text-red text-xs flex gap-px [&_svg]:size-3 items-center">
                          <FaNairaSign /> {item.price}
                        </span>
                      </Button>
                      <Button
                        // disabled={mutation.isPending}
                        variant="ghost"
                        onClick={() => handleRemoveCartItem(item)}
                        className="hover:bg-primary/80 hover:text-popover"
                      >
                         {mutation.isPending ? (
                          <Loader type="loader" />
                        ) : (
                          <TrashIcon />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="sticky bottom-0 bg-popover w-full shadow-inner p-4">
                  <Button asChild className="w-full">
                    <Link to="/account/cart">
                      View your cart
                      <ArrowUpRightFromCircleIcon />
                    </Link>
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
