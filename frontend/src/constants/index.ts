
import from 'react-icons/'

import { profile } from "../assets/images";


const navLinks: object[] = [
  { href: "/", label: "Home", icon: faHome, onlyUser: false, onlyGuest: false, onlySmScreen: false },
  { href: "/dashboard", label: "Dashboard", icon: faDashboard, onlyUser: true, onlyGuest: false, onlySmScreen: false },
  { href: "/messages", label: "Messages", icon: faInbox, onlyUser: true, onlyGuest: false, onlySmScreen: false },
  { href: "/courses", label: "Courses", icon: faBookOpenReader, onlyUser: false, onlyGuest: false, onlySmScreen: false },
  { href: "/:username", label: "Me", icon: profile, onlyUser: true, onlyGuest: false, onlySmScreen: true },
  { href: "/blogs", label: "Blogs", icon: faBlog, onlyUser: false, onlyGuest: false },
  { href: "/pricing", label: "Pricing", icon: faMoneyBillAlt, onlyUser: false, onlyGuest: false, onlySmScreen: false },
  { href: "/instructors", label: "Instructors", icon: faUserPen, onlyUser: false, onlyGuest: false, onlySmScreen: false },
  { href: "/about", label: "About", icon: faUserGroup, onlyUser: false, onlyGuest: true, onlySmScreen: false },
  { href: "/contact", label: "Contact", icon: faPhoneAlt, onlyUser: false, onlyGuest: true, onlySmScreen: false },
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