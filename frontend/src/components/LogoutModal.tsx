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
import { useLogout } from "@/api/hooks/useLogout";
import { useApp } from "@/app/app-provider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import Loader from "./Loader";

const LogoutModal = ({
  triggerChild,
  triggerClassName = "",
}: {
  triggerChild?: React.ReactNode;
  triggerClassName?: string;
}) => {
  const logoutMutation = useLogout();
  const { setUser, setIsAuth } = useApp();

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logoutMutation.mutate();
      setIsAuth(false);
      setUser(null);
      navigate("/");
      toast.success("Logout successful", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });
    } catch (error) {
      toast.error(mutationErrorHandler(logoutMutation, error));
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={triggerClassName} asChild>
        {triggerChild ?? "Logout"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center items-center justify-center">
          <DialogTitle className="p-5 bg-low-red text-red rounded-full mb-3">
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
            <Button
              disabled={logoutMutation.isPending}
              variant={"secondary"}
              className="text-base sm:text-lg "
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={logoutMutation.isPending}
            className="text-base sm:text-lg"
            onClick={handleLogout}
          >
            {logoutMutation.isPending ? <Loader type="all" /> : "Yes, logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
