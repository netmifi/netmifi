import { AffiliateMarketingSvg } from "@/assets/svg";
import { ArrowLeftSquareIcon, BookOpenText, Trophy, BookUserIcon, HomeIcon, LayoutDashboard, PhoneIcon, Settings, SheetIcon, UsersIcon, UsersRoundIcon, Clapperboard, PieChart } from "lucide-react";

export const customButtonDefinitions = {
  // button variant custom definitions
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
    xs: " rounded-md px-2 py-1 h-6",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
    "no-pad": "p-0",
  }
};

export const ROLES_LIST = {
  "User": 2001,
  "Blogger": 1984,
  "Instructor": 1766,
  "Admin": 5150,
  "SuperAdmin": 3103,
  "Overseer": 8439,
}

// NavLinks
export const navLinks: NavLinks[] = [
  // navigation links for top/side bar
  {
    href: "/home",
    label: "Home",
    icon: HomeIcon,
    onlyUser: false, // only viewed for logged in users?
    onlyGuest: false, // only viewed for visitors?
    onlySmallScreen: false, // only viewed on mobile devices?
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
    href: "/clips",
    label: "Clips",
    icon: Clapperboard,
    onlyUser: false,
    onlyGuest: false,
    onlySmallScreen: false,
  },{
    href: "/account/leader-board",
    label: "Leader Board",
    icon: Trophy,
    onlyUser: true,
    onlyGuest: false,
    onlySmallScreen: false,
  },
  // REM --- Blogs has been suspended
  // {
  //   href: "/blogs",
  //   label: "Blogs",
  //   icon: InfoIcon,
  //   onlyUser: false,
  //   onlyGuest: false,
  //   onlySmallScreen: false,
  // },
  // REM --- Pricing has been suspended, pay-per course feature in init
  // {
  //   href: "/pricing",
  //   label: "Pricing",
  //   icon: Wallet2,
  //   onlyUser: false,
  //   onlyGuest: false,
  //   onlySmallScreen: false,
  // },
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
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/my-courses",
    label: "Courses",
    icon: BookOpenText,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: PieChart,
  },
  {
    href: "/dashboard/quiz",
    label: "Quiz",
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

export const categories = [
  "article writing",
  "content creation",
  "copywriting",
  "graphics design",
  "digital marketing",
  "digital photography",
  "email marketing",
  "video editing",
  "technical writing",
  "content marketing strategy",
  "sound editing",
  "UI/UX design",
  "videography",
  "voiceover work",
];

// TODO: Add a map to check categories and show in 
export const courseSubjects = categories.flatMap((category) => {
  return { label: category, thumbnail: AffiliateMarketingSvg }
});

// [
//   { label: "affiliate marketing", thumbnail: AffiliateMarketingSvg },
//   { label: "content creation", thumbnail: AffiliateMarketingSvg },
//   { label: "copy writing", thumbnail: AffiliateMarketingSvg },
//   { label: "digital marketing", thumbnail: AffiliateMarketingSvg },
//   { label: "email copy writing", thumbnail: AffiliateMarketingSvg },
//   { label: "email marketing", thumbnail: AffiliateMarketingSvg },
//   { label: "graphic design", thumbnail: AffiliateMarketingSvg },
//   { label: "technical writing", thumbnail: AffiliateMarketingSvg },
//   { label: "UI/UX design", thumbnail: AffiliateMarketingSvg },
// ];
