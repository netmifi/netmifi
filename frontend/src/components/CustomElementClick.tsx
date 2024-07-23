import { useRef } from "react";
import useDoubleClick from "use-double-click";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CustomElementClick = ({
  children,
  className = "",
  handleSingleClick = () => {},
  handleDoubleClick = () => {},
}: CustomElementClickProps) => {
  const ref = useRef(null);

  useDoubleClick({
    onSingleClick: () => {
      handleSingleClick();
    },
    onDoubleClick: () => {
      handleDoubleClick();
    },
    ref: ref,
    latency: 250,
  });

  return (
    <Button ref={ref} asChild variant={"transparent"} className={cn("p-0", className)}>
      {children}
    </Button>
  );
};

export default CustomElementClick;
