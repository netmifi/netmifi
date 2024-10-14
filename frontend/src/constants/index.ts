import { AffiliateMarketingSvg } from "@/assets/svg";
import { BookUserIcon, HomeIcon, InfoIcon, LayoutDashboard, PhoneIcon, TagIcon, UsersIcon, Wallet2 } from "lucide-react";
import {
  AiFillInfoCircle,
  AiFillPhone,
  AiOutlineDashboard,
} from "react-icons/ai";
import { FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import { FaBookOpenReader, FaMoneyBill } from "react-icons/fa6";

// NavLinks

const navLinks: NavLinks[] = [
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
    icon: FaChalkboardTeacher,
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

const courseSubjects = [
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

export { navLinks, courseSubjects };
