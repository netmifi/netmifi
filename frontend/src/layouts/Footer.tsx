import { NavLink } from "react-router-dom";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaEnvelope, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { ChevronRight } from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear().toString();
  return (
    <footer>
      <div
        className="padding-x padding-y bg-black/95 
            flex flex-wrap sm:justify-evenly justify-between gap-4 
            *:flex *:flex-col *:gap-4"
      >
        <div>
          <h3 className="text-2xl capitalize text-destructive">
            about netmifi
          </h3>
          <div className="text-secondary flex flex-col gap-1">
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> About
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Courses
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Instructors
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Mentors
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Ebook
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Blogs
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Pricing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Become an affiliate
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Become an instructor
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Privacy and Policy
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Terms of use
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Help
            </NavLink>
          </div>
        </div>

        <div>
          <h3 className="text-2xl capitalize text-destructive">
            featured courses
          </h3>
          <div className="text-secondary flex flex-col gap-1">
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Content Production
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Digital Marketing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Technical Writing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Copy Writing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Email copy-writing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Video Editing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Photo Editing
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> 2d Animation
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> 3d Animation
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Graphic Design
            </NavLink>
            <NavLink
              to={""}
              className="text-gray-400 flex gap-1 items-center hover:text-white hover:translate-x-1 transition-all"
            >
              <ChevronRight /> Photography
            </NavLink>
          </div>
        </div>
        <div>
          <h3 className="text-2xl capitalize text-destructive">contact</h3>
          <div className="flex flex-col text-secondary gap-2 ">
            <p className="flex gap-1 items-center">
              <FaEnvelope /> support@netmifi.com
            </p>
            <p className="flex gap-1 items-center">
              <FaMobileAlt />
              +234-8160-1746-68
            </p>

            <div className="handles flex gap-2 items-center justify-center text-xl mt-3">
              <NavLink
                to={"https://facebook.com/netmifi"}
                className="hover:text-destructive"
              >
                <AiFillFacebook />
              </NavLink>
              <NavLink
                to={"https://instagram.com/netmifi"}
                className="hover:text-destructive"
              >
                <AiOutlineInstagram />
              </NavLink>
              <NavLink
                to={"https://x.com/netmifi"}
                className="hover:text-destructive"
              >
                <FaXTwitter />
              </NavLink>
              <NavLink
                to={"https://tiktok.com/netmifi"}
                className="hover:text-destructive"
              >
                <FaTiktok />
              </NavLink>
              <NavLink
                to={"https://youtube.com/netmifi"}
                className="hover:text-destructive"
              >
                <FaYoutube />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-gray-300 py-3 text-center text-xs sm:text">
        Copyright &copy; {year}, Netmifi Edutech Ltd. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
