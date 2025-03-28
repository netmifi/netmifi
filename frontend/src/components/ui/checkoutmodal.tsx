import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PaymentModal({
  trigger, // Accepts JSX (custom trigger button)
  title = "Select Payment Method",
  description = "Choose your preferred method",
  body = null, // Allows custom JSX body
  methods = [],
}) {
  return (
    <Dialog>
      {/* Custom Trigger */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Modal Content */}
      <DialogContent
        className="*:grow md:gap-6 justify-between flex flex-col md:rounded-3xl self-center md:place-self-center rounded-t-3xl p-6 md:p-20 max-w-7xl max-h-[80vh] 
          top-[15%] md:top-0 left-0 right-0 bottom-0 absolute bg-white 
          lg:translate-x-0 md:translate-x-0 md:translate-y-0 translate-x-0  translate-y-0"
      >
        {/* Header */}
        <DialogHeader className="flex justify-between items-center ">
          {title && <DialogTitle className="text-2xl">{title}</DialogTitle>}
        </DialogHeader>

        {/* Description (Optional) */}
        {description && (
          <DialogDescription className="text-sm gap-2 items-start text-gray-500 flex justify-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 4.05556V6.5M6.5 8.94444H6.50611M12 6.5C12 7.22227 11.8577 7.93747 11.5813 8.60476C11.3049 9.27205 10.8998 9.87836 10.3891 10.3891C9.87836 10.8998 9.27205 11.3049 8.60476 11.5813C7.93747 11.8577 7.22227 12 6.5 12C5.77773 12 5.06253 11.8577 4.39524 11.5813C3.72795 11.3049 3.12163 10.8998 2.61091 10.3891C2.10019 9.87836 1.69506 9.27205 1.41866 8.60476C1.14226 7.93747 1 7.22227 1 6.5C1 5.04131 1.57946 3.64236 2.61091 2.61091C3.64236 1.57946 5.04131 1 6.5 1C7.95869 1 9.35764 1.57946 10.3891 2.61091C11.4205 3.64236 12 5.04131 12 6.5Z"
                stroke="#CE2600"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="md:w-1/2 text-center">{description}</span>
          </DialogDescription>
        )}

        {/* Custom Body (Optional) */}
        {body && <div className="mt-4">{body}</div>}
      </DialogContent>
    </Dialog>
  );
}
