import { AiFillHome } from "react-icons/ai";
import { FaTelegram, FaWhatsapp } from "react-icons/fa"; // Cancel icon
import { FaPeopleGroup, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/images/netmifi_logo.svg";
import { ExternalLink, Linkedin, Menu, X } from "lucide-react";
import NavWaitlist from "@/components/navbar/NavbarWaitlist";

const Community = () => {

  return (
    <div className="bg-default w-auto lg:w-dvw h-dvh relative">
      <div className="absolute flex z-0 items-center justify-center min-h-dvh bg-white/90 top-0 right-0 left-0 bottom-0"></div>  
      <NavWaitlist/>
      {/* <div className="justify-between bg-white hidden lg:flex lg:h-80px lg:w-[833px] lg:px-[105px] lg:py-[30px] rounded-3xl ring-[0.3px] fixed top-[43px] left-[49px]">
        <div className="w-[133px] h-[39px]">
          <img src={Logo} alt="Logo netmifi" />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 ">
            <AiFillHome fill="#000000" size={20} />
            <a href="/home">Home</a>
          </div>
          <div className="flex items-center gap-2 w-[135px] h-[26px]">
            <FaPeopleGroup size={20} />
            <a href="/community">Community</a>
          </div>
        </div>
      </div>
      <div className="bg-white lg:hidden w-full lg:px-[105px] px-10 py-[30px] lg:ring-[0.3px] fixed space-y-4 ">
        <div className="justify-between flex r">
          <div className="w-[133px] h-[39px]">
            <img src={Logo} alt="Logo netmifi" />
          </div>

          <div className="flex gap-4 items-center">
            <Menu /> <X />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 ">
            <AiFillHome fill="#000000" size={20} />
            <a href="/home">Home</a>
          </div>
          <div className="flex items-center gap-2 w-[135px] h-[26px]">
            <FaPeopleGroup size={20} />
            <a href="/community">Community</a>
          </div>
        </div>
      </div> */}
      <div className="mt-36 lg:mt-56 flex justify-center lg:space-x-10">
        <div className="lg:flex flex-col hidden justify-between py-10 text-white h-[60vh]">
          <div className="bg-[#1DA1F2] px-2 text-center rounded-lg text-lg -skew-x-[9.62deg] skew-y-[9.62deg]">
            Adventurous
          </div>

          <div className="bg-[#A66CFF] px-2 text-center rounded-lg text-lg skew-x-[7.96deg] -skew-y-[7.96deg]">
            Community-driven
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-center gap-4 z-10 p-5 lg:px-0">
                  <h1 className="text-3xl lg:text-[2.05rem] font-bold lg:text-center lg:max-w-[700px]">
          JOIN OUR COMMUNITY!
          </h1>
          <p className="lg:max-w-[650px] lg:text-center text-[#1A0F28] text-medium lg:text-lg">
          Join our vibrant community to share ideas, learn from expert
          instructors, publish & sell digital assets and stay informed about the
          latest developments in e-learning.
          </p>

        <div className="md:w-[534px] w-full p-3 space-y-2 lg:space-y-5  rounded-xl ring-[1px] ring-[#D9D9D94D] bg-[#D9D9D94D]/30">
          <p className="font-bold lg:text-xl"> CLICK TO JOIN</p>

          <a
            href="https://yntstores.vercel.app/"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <FaXTwitter className="bg-black text-white p-1 w-6 h-6 rounded-full" />{" "}
              <a>X (Formerly Twitter)</a>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://yntstores.vercel.app/"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center gap-3 lg:gap-5 lg:w-1/2">
              {" "}
              <FaTelegram className="text-black p-1 w-8 h-8 rounded-full" />{" "}
              <a>Telegram</a>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://yntstores.vercel.app/"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <FaWhatsapp className="text-black p-1 w-8 h-8" />{" "}
              <a>Whatsapp</a>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://yntstores.vercel.app/"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <Linkedin fill="" className=" text-black p-1 w-8 h-8" />{" "}
              <a>Linkedin</a>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
        </div>
      </div>
        
        <div className="lg:flex flex-col hidden justify-between py-10 text-white h-[60vh]">
          <div className="bg-[#84C50E] px-4 text-center rounded-lg text-lg skew-x-[7.96deg] -skew-y-[7.96deg]">
            Growth
          </div>

          <div className="bg-[#FF5000] px-4 text-center rounded-lg text-lg -skew-x-[9.62deg] skew-y-[9.62deg]">
            Rewarding
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
