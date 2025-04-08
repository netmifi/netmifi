import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Building2Icon } from "lucide-react";

const PayoutSetupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-low-red border-2 rounded-md border-red px-3 py-2 text-base flex gap-3 font-semibold">
        <Building2Icon className="text-red" /> Set up payout
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Set up your cash-out
          </DialogTitle>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutSetupDialog;
