/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserIcon, X } from "lucide-react";
import {
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const ViewFollower = ({
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
            View Follower
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
          <p className="font-bold text-base sm:text-lg lowercase">
            {datum?.email}
          </p>
        </fieldset>
        <fieldset>
          <label className="text-xs sm:text-sm">Date</label>
          <p className="font-bold text-base sm:text-lg capitalize">
            {datum?.date.toDateString()}
          </p>
        </fieldset>

        <Button asChild className="ml-auto rounded-full">
          <Link to={`/user/${datum?.username}`}>
            <UserIcon /> View Profile
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ViewFollower;
