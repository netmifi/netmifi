import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomCard from "@/components/CustomCard";
import PaystackHandler from "./PaystackHandler";

export function Modal({
  trigger,
  itemsPaidFor,
  total,
  header = null,
  description = null,
  isOpen = false,
  // body = null,
  onClose,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onClose(open)}>
      {/* Custom Trigger */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="flex flex-col items-center">
        {/* Header */}
        <DialogHeader className="">
          {header && (
            <DialogTitle className="text-2xl text-center">{header}</DialogTitle>
          )}
        </DialogHeader>

        {/* Description (Optional) */}
        {description && (
          <DialogDescription className="text-sm tex-primary/70">
            <span className="text-center flex">{description}</span>
          </DialogDescription>
        )}

        {/* Custom Body (Optional) */}
        <div className="flex flex-col gap-4 mt-4 flex-wrap *:flex-grow">
          <PaystackHandler amount={total} courses={itemsPaidFor} />
          {/* <CustomCard
            logo={
              <svg
                width="29"
                height="26"
                viewBox="0 0 29 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.4121 4.67746L15.1366 0.103592C14.7264 -0.0345307 14.2742 -0.0345307 13.8639 0.103592L0.58793 4.67746C0.415233 4.73555 0.266419 4.83951 0.161363 4.97543C0.056308 5.11136 1.38358e-05 5.27279 0 5.43816L0 7.3125C0 7.76141 0.405547 8.125 0.90625 8.125H28.0938C28.5945 8.125 29 7.76141 29 7.3125V5.43816C29 5.09945 28.7655 4.79629 28.4121 4.67746ZM3.625 9.75V17.875H2.71875C2.21805 17.875 1.8125 18.2386 1.8125 18.6875V21.125H27.1875V18.6875C27.1875 18.2386 26.782 17.875 26.2812 17.875H25.375V9.75H21.75V17.875H16.3125V9.75H12.6875V17.875H7.25V9.75H3.625ZM28.0938 22.75H0.90625C0.405547 22.75 0 23.1136 0 23.5625V25.1875C0 25.6364 0.405547 26 0.90625 26H28.0938C28.5945 26 29 25.6364 29 25.1875V23.5625C29 23.1136 28.5945 22.75 28.0938 22.75Z"
                  fill="#9E0000"
                />
              </svg>
            }
            title="Bank Transfer"
            description="Transfer to Netmifi account"
          /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
