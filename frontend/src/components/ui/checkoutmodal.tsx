import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
        <DialogHeader className="">
          {header && <DialogTitle className="text-2xl text-center">{header}</DialogTitle>}
        </DialogHeader>

        {/* Description (Optional) */}
        {description && (
          <DialogDescription className="text-sm text-gray-500 ">
            <span className="text-center flex">{description}</span>
          </DialogDescription>
        )}

        {/* Custom Body (Optional) */}
        {body && <div className="mt-4">{body}</div>}

      </DialogContent>
    </Dialog>
  );
}
