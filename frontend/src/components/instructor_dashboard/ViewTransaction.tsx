import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { EyeIcon, X } from "lucide-react";

const ViewTransaction = ({
  datum,
  setIsViewOpen,
}: {
  datum: unknown;
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
        <AlertDialogDescription className="text-sm">
          Check transaction
        </AlertDialogDescription>
      </AlertDialogHeader>
    </div>
  );
};

export default ViewTransaction;
