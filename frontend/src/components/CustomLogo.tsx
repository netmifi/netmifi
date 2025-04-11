import { logo, logoText, logoTextWhite } from "@/assets/logo";
import { ClassValue } from "clsx";
import useWindowSize from "@/hooks/useWindowSize";
import { useTheme } from "@/app/theme-provider";

export const CustomLogo = ({
  className = "",
  logoScreenSize = "none",
}: {
  className?: ClassValue;
  logoScreenSize?: "xl" | "md" | "lg" | "sm" | "none" | "all";
}) => {
  const { effectiveTheme } = useTheme(); // Use effectiveTheme which is always "dark" or "light"
  const { width } = useWindowSize();

  const xlWidth = width && width < 1280;
  const lgWidth = width && width < 1024;
  const mdWidth = width && width < 768;
  const smWidth = width && width < 640;

  const switchingLogo = effectiveTheme === "dark" ? logoTextWhite : logoText;

  const checkLogoType = () => {
    if (logoScreenSize || logoScreenSize !== "none") {
      if (logoScreenSize !== "all") {
        if (logoScreenSize === "sm" && smWidth) {
          return logo;
        } else if (logoScreenSize === "md" && mdWidth) {
          return logo;
        } else if (logoScreenSize === "lg" && lgWidth) {
          return logo;
        } else if (logoScreenSize === "xl" && xlWidth) {
          return logo;
        } else {
          return switchingLogo;
        }
      } else {
        return logo;
      }
    } else {
      return switchingLogo;
    }
  };
  return (
    <img
      className={className as string}
      src={checkLogoType()}
      alt="Netmifi logo"
    />
  );
};
