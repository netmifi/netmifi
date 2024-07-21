import { useRef } from "react";
import useDoubleClick from "use-double-click";
import { Button } from "./ui/button";

const CustomElementClick = ({
  children,
  handleSingleClick = () => {},
  handleDoubleClick = () => {},
}: CustomElementClickProps) => {
  const ref = useRef();

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
    <Button ref={ref} asChild variant={"transparent"} className="p-0">
      {children}
    </Button>
  );
};

export default CustomElementClick;
