import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";
const Loader = ({ className = "", type, size = 20 }: LoaderProps) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      {(type === "all" || type === "loader") && (
        <FaSpinner size={size} className="animate-spin" />
      )}
      {(type === "all" || type === "text") && (
        <span className="animate-pulse font-montserrat">Loading...</span>
      )}
    </div>
  );
};
export default Loader;
