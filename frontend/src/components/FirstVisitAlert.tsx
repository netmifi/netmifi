import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { CustomLogo } from "./CustomLogo";

export default function FirstVisitAlert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowAlert(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  if (!showAlert) return null;

  return (
    <Alert className="fixed z-50 top-5 right-0 sm:w-96">
      <AlertTitle className="text-lg font-semibold flex gap-2 items-center">
        Welcome to <CustomLogo className="w-24" />
      </AlertTitle>
      <AlertDescription className="mt-2">
        This is a demo version of the application, your Feedback is highly
        needed for creating a more user-friendly software. Thank you for
        visiting. We hope you enjoy your stay!
      </AlertDescription>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Close alert"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
