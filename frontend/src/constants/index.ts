
import { AiFillInfoCircle, AiFillPhone, AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { profile } from "../assets/images";
import { FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import {FaBookOpenReader, FaMoneyBill } from "react-icons/fa6";


const navLinks: NavLinks[] = [
  { href: "/", label: "Home", icon: FaHome, onlyUser: false, onlyGuest: false, onlySmallScreen: false },
  { href: "/dashboard", label: "Dashboard", icon: AiOutlineDashboard, onlyUser: true, onlyGuest: false, onlySmallScreen: false },
  // { href: "/messages", label: "Messages", icon: AiOutlineInbox, onlyUser: true, onlyGuest: false, onlySmallScreen: false },
  { href: "/courses", label: "Courses", icon: FaBookOpenReader, onlyUser: false, onlyGuest: false, onlySmallScreen: false },
  // { href: "/:username", label: "Me", icon: profile, onlyUser: true, onlyGuest: false, onlySmallScreen: true },
  { href: "/blogs", label: "Blogs", icon: AiFillInfoCircle, onlyUser: false, onlyGuest: false, onlySmallScreen: false },
  { href: "/pricing", label: "Pricing", icon: FaMoneyBill, onlyUser: false, onlyGuest: false, onlySmallScreen: false },
  { href: "/instructors", label: "Instructors", icon: FaChalkboardTeacher, onlyUser: false, onlyGuest: false, onlySmallScreen: false },
  { href: "/about", label: "About", icon: FaUsers, onlyUser: false, onlyGuest: true, onlySmallScreen: false },
  { href: "/contact", label: "Contact", icon: AiFillPhone, onlyUser: false, onlyGuest: true, onlySmallScreen: false },
];

const courseSubjects: string[] = [
  'affiliate marketing',
  'content creation',
  'copy writing',
  'digital marketing',
  'email copy writing',
  'email marketing',
  'graphic design',
  'technical writing',
  'UI/UX design',
];

export { navLinks, courseSubjects }