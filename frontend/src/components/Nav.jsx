import { navLinks } from "../constants";
import { logoText } from "../assets/svg";

import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white-background flex items-center justify-between flex-wrap padding-x py-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
        <img src={logoText} className="w-100 h-10 mr-2" alt="Logo" />
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-jet-black h-5 w-5 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-jet-black h-5 w-5 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-timber-wolf text-lg lg:flex-grow">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block mt-4 lg:inline-block lg:mt-0 text-eerie-black mr-4 font-montserrat"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <button className="font-montserrat inline-flex items-center bg-penn-red border-0 py-2 px-4 text-white rounded-md ">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
