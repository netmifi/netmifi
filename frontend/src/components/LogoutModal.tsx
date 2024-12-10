import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const LogoutModal = ({
  triggerChild,
  triggerClassName = "",
}: {
  triggerChild?: React.ReactNode;
  triggerClassName?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog>
      <DialogTrigger className={triggerClassName} asChild>
        {triggerChild ?? "Logout"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center items-center justify-center">
          <DialogTitle className="p-5 bg-destructive/20 text-red rounded-full mb-3">
            <LogOutIcon className="size-16" />
          </DialogTitle>
          <DialogTitle className="text-xl sm:text-2xl">Logout</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
      
        <hr />
        <DialogFooter className="*:flex-grow">
          <DialogClose asChild className="">
            <Button variant={"secondary"} className="text-base sm:text-lg ">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} className="text-base sm:text-lg">
           Yes, logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
