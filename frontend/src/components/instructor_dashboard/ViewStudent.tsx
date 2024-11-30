/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
const ViewStudent = ({
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
            View Student
          </AlertDialogTitle>
          <AlertDialogCancel
            className="border-0 p-0 outline-none ring-0"
            onClick={() => (setIsViewOpen ? setIsViewOpen(false) : "")}
          >
            <X />
          </AlertDialogCancel>
        </div>
      </AlertDialogHeader>

      <div className="flex flex-col gap-2">
        <fieldset>
          <label className="text-xs sm:text-sm">Student Name</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.name}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Email</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.email}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Course Purchase</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.course}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Amount Paid</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            #{datum?.amount.toLocaleString()}
          </p>
        </fieldset>
        {datum?.certifiedOn && (
          <fieldset>
            <label className="text-xs sm:text-sm">Amount Piaid</label>
            <p className="font-bold text-base sm:text-lg capitalize">
              {datum?.certifiedOn.toDateString()}
            </p>
          </fieldset>
        )}
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

export default ViewStudent;
