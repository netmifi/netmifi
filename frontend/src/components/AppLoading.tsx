import { useApp } from "@/app/app-provider";
import { CustomLogo } from "./CustomLogo";
import { cn } from "@/lib/utils";

const AppLoading = () => {
  const { isAppLoading } = useApp();

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 w-full h-full bg-background/90 z-[100] flex items-center justify-center transition-opacity duration-500",
        isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <CustomLogo className="size-[30%] animate-pulse" />
    </div>
  );
};

export default AppLoading;
