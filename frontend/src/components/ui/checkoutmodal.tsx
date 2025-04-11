import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Modal({
  trigger,
  header = null,
  description = null,
  isOpen = false,
  body = null, 
  onClose,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onClose(open)}>
      {/* Custom Trigger */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="flex flex-col items-center"
        
      >
        {/* Header */}
        <DialogHeader className="flex justify-between items-center ">
          {header && <DialogTitle className="text-2xl">{header}</DialogTitle>}
        </DialogHeader>

        {/* Description (Optional) */}
        {description && (
          <DialogDescription className="text-sm gap-2 items-start text-gray-500 flex justify-center">
            <span className="text-center">{description}</span>
          </DialogDescription>
        )}

        {/* Custom Body (Optional) */}
        {body && <div className="mt-4">{body}</div>}

        {/* Optional Close Button */}
        <Button className="mt-4" onClick={() => onClose && onClose()}>
          Claim <ArrowRight/>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
