import { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import Logo from "../../assets/images/netmifi_logo.svg"; // Update with actual path
import { Menu } from "lucide-react"; // Update with actual component
import { X } from "lucide-react"; // Update with actual component
import { FaPeopleGroup } from "react-icons/fa6";

const NavWaitlist = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Tracking active link

  // Check current path and set active link accordingly
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("community")) {
      setActiveLink("community");
    } else {
      setActiveLink("home");
    }
  }, []); // Empty array means this effect runs once on mount

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="">
      {/* Mobile Navigation */}
      <div
        className={`bg-white z-50 lg:hidden w-full lg:px-[105px] py-[30px] lg:ring-[0.3px] fixed space-y-4`}
      >
        <div className="justify-between flex border-b-[#00000088] border-b-[0.5px] py-4 px-5">
          <div className="w-[133px] h-[39px]">
            <img src={Logo} alt="Logo netmifi" />
          </div>

          <div className="flex gap-4 items-center">
            {/* Show Menu icon when the nav is closed, X icon when it's open */}
            {!isNavOpen ? (
              <button onClick={toggleNav}>
                <Menu />
              </button>
            ) : (
              <button className='text-[#9E0000]' onClick={toggleNav}>
                <X />
              </button>
            )}
          </div>
        </div>

        {isNavOpen && (
          <div>
            <div
              className={`flex items-center gap-2 py-3 mx-3 px-5 ${
                activeLink === "home"
                  ? "text-red-600 border-b-[0.3px] border-b-[#6d3d3d33]"
                  : "border-b-[0.3px] border-b-[#00000033] text-[#000000]/50"
              } `}
              onClick={() => setActiveLink("home")}
            >
              <AiFillHome
                fill={activeLink === "home" ? "#9E0000" : "#00000055"}
                size={20}
              />
              <a href="/home">Home</a>
            </div>
            <div
              className={`flex items-center gap-2 py-3 mx-3 px-5 ${
                activeLink === "community"
                  ? "text-red-600 border-b-[0.3px] border-b-[#00000033]"
                  : "border-b-[0.3px] border-b-[#00000033] text-[#00000033]/50"
              } `}
              onClick={() => setActiveLink("community")}
            >
              <FaPeopleGroup size={20} />
              <a href="/community">Community</a>
            </div>
          </div>
        )}
        <div className=""></div>
      </div>

      {/* Desktop Navigation */}
      <div className="justify-between items-center bg-white hidden lg:flex lg:h-[80px] lg:w-[833px] lg:px-[105px] lg:py-[30px] rounded-3xl ring-[0.3px] fixed top-[43px] left-[49px]">
        <div className="w-[133px] h-[39px]">
          <img src={Logo} alt="Logo netmifi" />
        </div>

        <div className="flex gap-4 items-center">
          <div
            className={`flex items-center gap-2 ${
              activeLink === "home"
                ? "border-b-2 border-red-600 text-red-600"
                : "border-b-[0.3px] border-[#00000033]"
            } `}
            onClick={() => setActiveLink("home")}
          >
            <AiFillHome
              fill={activeLink === "home" ? "#9E0000" : "#000"}
              size={20}
            />
            <a href="/home">Home</a>
          </div>
          <div
            className={`flex items-center gap-2 w-[135px] h-[26px] ${
              activeLink === "community"
                ? "border-b-2 border-red-600 text-red-600"
                : "border-b-[0.3px] border-[#00000033]"
            } `}
            onClick={() => setActiveLink("community")}
          >
            <FaPeopleGroup size={20} />
            <a href="/community">Community</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavWaitlist;
