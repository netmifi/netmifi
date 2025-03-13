import { AffiliateMarketingSvg } from "@/assets/svg";
import { ArrowLeftSquareIcon, BookOpenText, BookUserIcon, CreditCardIcon, HomeIcon, InfoIcon, LayoutDashboard, PhoneIcon, Settings, SheetIcon, UsersIcon, UsersRoundIcon, Wallet2 } from "lucide-react";

export const customButtonDefinitions = {
  variants: {
    default: "bg-red text-primary-foreground hover:brightness-95",
    blue: "bg-blue text-primary-foreground hover:brightness-95",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-transparent text-primary hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:brightness-90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    transparent: "bg-transparent text-primary-foreground-foreground",
  },

  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
    "no-pad": "p-0",
  }
};
// NavLinks
export const navLinks: NavLinks[] = [
  {
    href: "/home",
    label: "Home",
    icon: HomeIcon,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    onlyUser: true,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: BookUserIcon,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/blogs",
    label: "Blogs",
    icon: InfoIcon,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: Wallet2,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/instructors",
    label: "Instructors",
    icon: UsersRoundIcon,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  {
    href: "/about",
    label: "About",
    icon: UsersIcon,
    onlyUser: false,
    onlyGuest: true,
    onlySmallScreen: false,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: PhoneIcon,
    onlyUser: false,
    onlyGuest: true,
    onlySmallScreen: false,
  },
];

export const instructorDashboardLinks = [
  {
    href: "/dashboard/home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/my-courses",
    label: "My Courses",
    icon: BookOpenText,
  },
  {
    href: "/dashboard/my-earnings",
    label: "My Earnings",
    icon: CreditCardIcon,
  },
  {
    href: "/dashboard/quiz",
    label: "Quiz Attempts",
    icon: SheetIcon,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "/",
    label: "Back Home",
    icon: ArrowLeftSquareIcon,
  },

];

export const courseSubjects = [
  { label: "affiliate marketing", thumbnail: AffiliateMarketingSvg },
  { label: "content creation", thumbnail: AffiliateMarketingSvg },
  { label: "copy writing", thumbnail: AffiliateMarketingSvg },
  { label: "digital marketing", thumbnail: AffiliateMarketingSvg },
  { label: "email copy writing", thumbnail: AffiliateMarketingSvg },
  { label: "email marketing", thumbnail: AffiliateMarketingSvg },
  { label: "graphic design", thumbnail: AffiliateMarketingSvg },
  { label: "technical writing", thumbnail: AffiliateMarketingSvg },
  { label: "UI/UX design", thumbnail: AffiliateMarketingSvg },
];