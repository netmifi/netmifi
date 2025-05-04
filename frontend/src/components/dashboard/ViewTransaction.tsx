/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { X } from "lucide-react";

const ViewTransaction = ({
  datum,
  setIsViewOpen,
}: {
  datum: any;
  setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="max-h-screen overflow-y-auto">
      <AlertDialogHeader className="flex">
        <div className="flex justify-between">
          <AlertDialogTitle className="text-xl p-0">
            View Transaction
          </AlertDialogTitle>
          <AlertDialogCancel
            className="border-0 p-0"
            onClick={() => (setIsViewOpen ? setIsViewOpen(false) : "")}
          >
            <X />
          </AlertDialogCancel>
        </div>
      </AlertDialogHeader>
      <div className="flex flex-col gap-2">
        <fieldset>
          <label className="text-xs sm:text-sm">Bought by</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.boughtBy}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Course</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.course}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Transaction ID</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.transactionId}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Status</label>
          <p
            className={cn(
              "font-bold text-base sm:text-lg capitalize rounded-full py-1 px-5 size-fit",
              {
                "bg-green-500 text-white": datum?.status === "success",
                "bg-yellow-500": datum?.status === "pending",
                "bg-destructive text-popover": datum?.status === "error",
              }
            )}
          >
            {datum?.status}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Amount Paid</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            #{datum?.amount.toLocaleString()}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Date</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.date.toDateString()}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default ViewTransaction;
