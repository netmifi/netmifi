import { AffiliateMarketingSvg } from "@/assets/svg";
import { ArrowLeftSquareIcon, BookOpenText, Trophy, BookUserIcon, CreditCardIcon, HomeIcon, InfoIcon, LayoutDashboard, PhoneIcon, Settings, SheetIcon, UsersIcon, UsersRoundIcon, Wallet2, Clapperboard, BarChart2, Calendar, MessageSquare } from "lucide-react";

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
    href: "/dashboard/courses",
    label: "Courses",
    icon: BookOpenText,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: UsersRoundIcon,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart2,
  },
  {
    href: "/dashboard/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    href: "/dashboard/reviews",
    label: "Reviews",
    icon: MessageSquare,
  },
  {
    href: "/dashboard/followers",
    label: "Followers",
    icon: UsersIcon,
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
    { label: "Web Development", value: "web-development" },
    { label: "Mobile Development", value: "mobile-development" },
    { label: "Data Science", value: "data-science" },
    { label: "Machine Learning", value: "machine-learning" },
    { label: "Artificial Intelligence", value: "artificial-intelligence" },
    { label: "Cloud Computing", value: "cloud-computing" },
    { label: "DevOps", value: "devops" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "UI/UX Design", value: "ui-ux-design" },
    { label: "Digital Marketing", value: "digital-marketing" },
    { label: "Business", value: "business" },
    { label: "Finance", value: "finance" },
    { label: "Language", value: "language" },
    { label: "Music", value: "music" },
    { label: "Photography", value: "photography" },
    { label: "Other", value: "other" }
];

export const timeZones = [
  { label: "UTC−12:00 – Baker Island", value: "Etc/GMT+12" },
  { label: "UTC−11:00 – Niue, American Samoa", value: "Pacific/Niue" },
  { label: "UTC−10:00 – Hawaii", value: "Pacific/Honolulu" },
  { label: "UTC−09:00 – Alaska", value: "America/Anchorage" },
  { label: "UTC−08:00 – Pacific Time (US & Canada)", value: "America/Los_Angeles" },
  { label: "UTC−07:00 – Mountain Time (US & Canada)", value: "America/Denver" },
  { label: "UTC−06:00 – Central Time (US & Canada)", value: "America/Chicago" },
  { label: "UTC−05:00 – Eastern Time (US & Canada)", value: "America/New_York" },
  { label: "UTC−04:00 – Atlantic Time (Canada), Caracas", value: "America/Halifax" },
  { label: "UTC−03:00 – Buenos Aires, Greenland", value: "America/Argentina/Buenos_Aires" },
  { label: "UTC−02:00 – South Georgia/Sandwich Is.", value: "Atlantic/South_Georgia" },
  { label: "UTC−01:00 – Azores", value: "Atlantic/Azores" },
  { label: "UTC±00:00 – GMT, London", value: "Europe/London" },
  { label: "UTC+01:00 – Berlin, Lagos, Paris", value: "Europe/Berlin" },
  { label: "UTC+02:00 – Johannesburg, Cairo, Kyiv", value: "Africa/Johannesburg" },
  { label: "UTC+03:00 – Moscow, Nairobi, Riyadh", value: "Europe/Moscow" },
  { label: "UTC+04:00 – Dubai, Baku", value: "Asia/Dubai" },
  { label: "UTC+05:00 – Pakistan, Yekaterinburg", value: "Asia/Karachi" },
  { label: "UTC+06:00 – Bangladesh, Kazakhstan", value: "Asia/Dhaka" },
  { label: "UTC+07:00 – Bangkok, Jakarta", value: "Asia/Bangkok" },
  { label: "UTC+08:00 – Beijing, Singapore, Perth", value: "Asia/Shanghai" },
  { label: "UTC+09:00 – Tokyo, Seoul", value: "Asia/Tokyo" },
  { label: "UTC+10:00 – Sydney, Vladivostok", value: "Australia/Sydney" },
  { label: "UTC+11:00 – Solomon Islands, New Caledonia", value: "Pacific/Guadalcanal" },
  { label: "UTC+12:00 – Fiji, Auckland", value: "Pacific/Auckland" }
];

export const languages = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Chinese", value: "chinese" },
    { label: "Japanese", value: "japanese" },
    { label: "Korean", value: "korean" },
    { label: "Arabic", value: "arabic" },
    { label: "Hindi", value: "hindi" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Russian", value: "russian" },
    { label: "Italian", value: "italian" },
    { label: "Dutch", value: "dutch" },
    { label: "Other", value: "other" }
];

export const certifications = [
    { label: "Google Certified Educator", value: "google-certified-educator" },
    { label: "Microsoft Certified Trainer", value: "microsoft-certified-trainer" },
    { label: "AWS Certified Instructor", value: "aws-certified-instructor" },
    { label: "Adobe Certified Instructor", value: "adobe-certified-instructor" },
    { label: "Cisco Certified Instructor", value: "cisco-certified-instructor" },
    { label: "Other", value: "other" }
];

export const radioGroupData = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
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
